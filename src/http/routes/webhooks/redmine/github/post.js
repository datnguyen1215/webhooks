import github from '@src/github';
import redmine from '@src/redmine';
import logging from '@src/logging';

const logger = logging.create('webhooks:redmine:github:post');

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
    const { pull_request, repository } = body;

    if (!pull_request) {
      logger.warn(`Body does not contain pull_request. Ignoring GitHub webhook`);
      res.status(400).json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    const { merged_by: user, merge_commit_sha, merged, title } = pull_request;

    if (!merged) {
      logger.warn(`Pull request is not merged. Ignoring GitHub webhook`);
      res.status(400).json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    // extract id from title
    const matches = title.match(/\[.*#(\d+)\]/);
    if (!matches) {
      logger.warn(`Title does not contain issue ID: ${title}. Ignoring GitHub webhook`);
      res.status(400).json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    const [_, id] = matches;

    logger.info(`Getting commits from pull request: ${pull_request.number}`);
    const commits = await github.pull.commits({
      owner: repository.owner.login,
      repo: repository.name,
      pull_id: pull_request.number
    });

    logger.info(`Getting tags from repository: ${repository.name}`);
    const tags = await github.tags({
      owner: repository.owner.login,
      repo: repository.name
    });

    // get the last tag
    const lastTag = tags[tags.length - 1]?.ref;
    const newtag = newTag(lastTag);

    const notes =
      `Merge SHA: ${merge_commit_sha}\n` +
      `Changes:\n` +
      commits.map(c => `>  - ${c.commit.message}\n`).join('') +
      `Author: ${user.login}\n` +
      `Component: ${component} ${newtag}`;

    logger.info(`Notes: \n${notes}`);

    // update issue with merge request details
    await redmine.issues.update(id, { notes });

    logger.info(`Redmine issue #${id} updated`);
    res.json({ message: 'Redmine issue updated' });
  } catch (err) {
    next(err);
  }
};

export default post;
