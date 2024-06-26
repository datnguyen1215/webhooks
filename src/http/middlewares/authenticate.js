/**
 * Middleware to check if the user is authenticated
 * @returns {Function}
 */
const authenticate = () => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: { message: 'Unauthorized', code: 'unauthorized' } });
      return;
    }

    next();
  };
};

export default authenticate;
