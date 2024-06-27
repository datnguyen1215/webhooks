import https from 'https';
import axios from 'axios';
import settings from '@src/settings';

const config = settings.get();

/**
 * Get list of commits from merge request.
 * @param {string|number} projectId
 * @param {string|number} mergeRequestId
 * @returns
 */
const commits = async (projectId, mergeRequestId) => {
  const headers = {
    'PRIVATE-TOKEN': config.gitlab.access_token
  };

  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  const resp = await axios.get(
    `https://sbwdlab.screenbeam.com:8888/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}/commits`,
    {
      headers,
      httpsAgent: agent
    }
  );

  return resp.data;
};

export default commits;
