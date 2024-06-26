import redmine from '@src/redmine';

const post = () => async (req, res, next) => {
  try {
    const { query } = req;
    const { body } = req;
    const { component } = query;
    const { pull_request } = body;
    const { merged_by: user, merge_commit_sha, merged, title } = pull_request;

    if (!merged) {
      console.log('Ignoring GitLab webhook');
      res.json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    // extract id from title
    const matches = title.match(/\[.*#(\d+)\]/);
    if (!matches) {
      res.json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    const [_, id] = matches;

    const notes = `Merge SHA: ${merge_commit_sha}\nMerge Title: ${title}\nAuthor: ${user.login}\nComponent: ${component}`;

    // update issue with merge request details
    await redmine.issues.update(id, { notes });

    res.json({ message: 'Redmine issue updated' });
  } catch (err) {
    next(err);
  }
};

export default post;
