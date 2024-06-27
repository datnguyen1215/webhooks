import axios from 'axios';
import settings from '@src/settings';

const config = settings.get();

/**
 * Getting all commits of a pull request.
 * @param {*} param0
 * @param {*} param0.owner
 * @param {*} param0.repo
 * @param {*} param0.merge_id
 * @returns {Promise<Array>}
 */
const commits = async ({ owner, repo, pull_id }) => {
  if (!config.github?.access_token || !config.github?.url)
    throw new Error('', {
      cause: { code: 'MISSING_CONFIG', config: 'github' }
    });

  const headers = {
    Authorization: `Bearer ${config.github.access_token}`,
    'Content-Type': 'application/json'
  };

  const url = `${config.github.url}/repos/${owner}/${repo}/pulls/${pull_id}/commits`;
  const { data } = await axios.get(url, { headers });
  return data;
};

export default commits;
