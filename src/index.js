import './aliases';
import settings from './settings';
import http from './http';

(async () => {
  console.log(`Settings: ${JSON.stringify(settings.get())}`);

  await http.server.start();
})();
