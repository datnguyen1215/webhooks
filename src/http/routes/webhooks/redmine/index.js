import { Router } from 'express';
import gitlab from './gitlab';
import github from './github';

/**
 * Expose /webhooks/redmine/* routes
 * @returns {Router}
 */
const api = () => {
  const router = Router();
  router.use('/gitlab', gitlab());
  router.use('/github', github());
  return router;
};

export default api;
