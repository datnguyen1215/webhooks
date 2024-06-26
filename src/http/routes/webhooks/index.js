import { Router } from 'express';
import healthcheck from './healthcheck';
import redmine from './redmine';

/**
 * Expose /api/* routes.
 * @returns {Router}
 */
const webhooks = () => {
  const router = Router();
  router.use('/healthcheck', healthcheck());
  router.use('/redmine', redmine());
  return router;
};

export default webhooks;
