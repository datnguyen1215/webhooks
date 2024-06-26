import https from 'https';
import settings from '@src/settings';
import axios from 'axios';

const config = settings.get();

const update = async (id, data) => {
  // ignore certificate for axios
  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  const headers = {
    'X-Redmine-API-Key': config.redmine.apiKey,
    'Content-Type': 'application/json'
  };

  const url = `${config.redmine.url}/issues/${id}.json`;
  const payload = { issue: data };

  const resp = await axios.put(url, payload, { headers, httpsAgent: agent });
  console.log(`Response: ${JSON.stringify(resp.data)}`);
};

export default update;
