import base from './base';

/**
 * Create a logger with a label.
 * @param {string} label 
 * @returns {import('winston').Logger}
 */
const create = label => {
  return base.child({ label });
};

export default create;
