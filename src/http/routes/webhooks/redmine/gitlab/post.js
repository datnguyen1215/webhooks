import redmine from '@src/redmine';

const update_issue = async (id, data) => {
  return new Promise((resolve, reject) => {
    redmine.update_issue(id, data, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
};

const post = () => async (req, res, next) => {
  try {
    const { query } = req;
    const { body } = req;
    const { component } = query;
    const { event_type, object_attributes, user } = body;

    if (event_type !== 'merge_request') {
      console.log('Ignoring GitLab webhook');
      res.json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    if (object_attributes.state !== 'merged') {
      console.log('Ignoring GitLab webhook');
      res.json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    // get title and description from merge request
    const { title, merge_commit_sha } = object_attributes;

    // extract id from title
    const matches = title.match(/\[.*#(\d+)\]/);
    if (!matches) {
      res.json({ message: 'Ignoring GitLab webhook' });
      return;
    }

    const [_, id] = matches;

    const notes = `Merge SHA: ${merge_commit_sha}\nMerge Title: ${title}\nAuthor: ${user.name}\nComponent: ${component}`;

    // update issue with merge request details
    await redmine.issues.update(id, { notes });

    res.json({ message: 'Redmine issue updated' });
  } catch (err) {
    next(err);
  }
};

export default post;
