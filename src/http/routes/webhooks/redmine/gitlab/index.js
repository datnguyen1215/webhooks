import { Router } from 'express';
import post from './post';

/**
 * Expose /webhooks/redmine/gitlab/* routes.
 * @returns {Router}
 */
const gitlab = () => {
  const router = Router();

  router.post('/', post());

  return router;
};

export default gitlab;
