import { Router } from 'express';
import post from './post';

/**
 * Expose /webhooks/redmine/github/* routes.
 * @returns {Router}
 */
const github = () => {
  const router = Router();

  router.post('/', post());

  return router;
};

export default github;
