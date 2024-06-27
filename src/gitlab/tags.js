import https from 'https';
import axios from 'axios';
import settings from '@src/settings';

const config = settings.get();

const tags = async projectId => {
  const headers = {
    'PRIVATE-TOKEN': config.gitlab.access_token
  };

  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  const resp = await axios.get(
    `https://sbwdlab.screenbeam.com:8888/api/v4/projects/${projectId}/repository/tags`,
    {
      headers,
      httpsAgent: agent
    }
  );

  return resp.data;
};

export default tags;