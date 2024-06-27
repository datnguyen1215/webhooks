import gitlab from '@src/gitlab';
import redmine from '@src/redmine';
import logging from '@src/logging';

const logger = logging.create('webhooks:redmine:gitlab:post');

const newTag = previousTag => {
  if (!previousTag) return '';

  previousTag = previousTag.split('/')[1];

  // get the last number
  const tag = previousTag?.match(/\d+$/)[0];

  const newTag = parseInt(tag) + 1;

  // append the new tag to the previous tag
  const newTagString = previousTag?.replace(/\d+$/, newTag);
  return newTagString;
};

const post = () => async (req, res, next) => {
  try {
    const { query } = req;
    const { body } = req;
    const { component } = query;
    const { event_type, object_attributes, user, project } = body;

    if (event_type !== 'merge_request') {
      logger.warn(`Event type is not merge_request. Ignoring GitLab webhook`);
      res.status(400).json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    if (object_attributes.state !== 'merged') {
      logger.warn(`Merge request is not merged. Ignoring GitLab webhook`);
      res.status(400).json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    // get title and description from merge request
    const { title, merge_commit_sha } = object_attributes;

    // extract id from title
    const matches = title.match(/\[.*#(\d+)\]/);
    if (!matches) {
      logger.warn(`Title does not contain issue ID: ${title}. Ignoring GitLab webhook`);
      res.status(400).json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    const [_, issue_id] = matches;

    logger.info(`Getting commits from merge request: ${object_attributes.iid}`);
    const commits = await gitlab.merge.commits(project.id, object_attributes.iid);

    const tags = await gitlab.tags(project.id);
    // get the first tag

    const tag = newTag(tags[0].name);

    const notes =
      `Merge SHA: ${merge_commit_sha}\n` +
      `Changes:\n` +
      commits.map(commit => `>  - ${commit.message}`).join('') +
      `Author: ${user.name}\n` +
      `Component: ${component} ${tag}`;

    logger.info('Notes: \n' + notes);

    // update issue with merge request details
    await redmine.issues.update(issue_id, { notes });

    res.json({ message: 'Redmine issue updated' });
  } catch (err) {
    next(err);
  }
};

export default post;
