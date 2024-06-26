import redmine from '@src/redmine';
import logging from '@src/logging';

const logger = logging.create('webhooks:redmine:github:post');

const post = () => async (req, res, next) => {
  try {
    const { query } = req;
    const { body } = req;
    const { component } = query;
    const { pull_request } = body;

    if (!pull_request) {
      logger.info(`Body does not contain pull_request. Ignoring GitHub webhook`);
      res.json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    const { merged_by: user, merge_commit_sha, merged, title } = pull_request;

    if (!merged) {
      logger.info(`Pull request is not merged. Ignoring GitHub webhook`);
      res.json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    // extract id from title
    const matches = title.match(/\[.*#(\d+)\]/);
    if (!matches) {
      logger.info(`Title does not contain issue ID: ${title}. Ignoring GitHub webhook`);
      res.json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    const [_, id] = matches;

    const notes = `Merge SHA: ${merge_commit_sha}\nMerge Title: ${title}\nAuthor: ${user.login}\nComponent: ${component}`;

    // update issue with merge request details
    await redmine.issues.update(id, { notes });

    logger.info(`Redmine issue #${id} updated`);
    res.json({ message: 'Redmine issue updated' });
  } catch (err) {
    next(err);
  }
};

export default post;
