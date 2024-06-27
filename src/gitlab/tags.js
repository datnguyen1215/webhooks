import https from 'https';
import axios from 'axios';
import settings from '@src/settings';

const config = settings.get();

const tags = async projectId => {
  if (!config.gitlab.access_token)
    throw new Error('', { cause: { code: 'MISSING_ENV', name: 'GITLAB_ACCESS_TOKEN' } });

  if (!config.gitlab.url)
    throw new Error('', { cause: { code: 'MISSING_ENV', name: 'GITLAB_URL' } });

  const headers = {
    'PRIVATE-TOKEN': config.gitlab.access_token
  };

  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  const resp = await axios.get(
    `${config.gitlab.url}/api/v4/projects/${projectId}/repository/tags`,
    {
      headers,
      httpsAgent: agent
    }
  );

  return resp.data;
};

export default tags;
