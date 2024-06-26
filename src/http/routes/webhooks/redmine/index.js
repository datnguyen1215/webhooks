import { Router } from 'express';
import gitlab from './gitlab';

/**
 * Expose /webhooks/redmine/* routes
 * @returns {Router}
 */
const api = () => {
  const router = Router();
  router.use('/gitlab', gitlab());
  return router;
};

export default api;
