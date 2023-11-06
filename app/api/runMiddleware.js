import Cors from 'cors';

export function runMiddleware(req, res, fn) {
  return new Promise(async (resolve, reject) => {
    try {
      await fn(req, res);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
