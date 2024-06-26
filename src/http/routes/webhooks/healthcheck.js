import { Router } from 'express';

/**
 * Expose /healthcheck endpoint.
 * @returns {Router}
 */
const healthcheck = () => {
  const router = Router();

  router.get('/', (req, res) => {
    res.status(200).send('OK');
  });

  return router;
};

export default healthcheck;
