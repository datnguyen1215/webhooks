import axios from 'axios';
import settings from '@src/settings';

const config = settings.get();

const tags = async ({ owner, repo }) => {
  if (!config.github?.access_token || !config.github?.url)
    throw new Error('', {
      cause: { code: 'MISSING_CONFIG', config: 'github' }
    });

  const headers = {
    Authorization: `Bearer ${config.github.access_token}`,
    'Content-Type': 'application/json'
  };

  const url = `${config.github.url}/repos/${owner}/${repo}/tags`;
  const { data } = await axios.get(url, { headers });
  return data;
};

export default tags;
