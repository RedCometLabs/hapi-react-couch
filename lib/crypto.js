import crypto from 'crypto';
import config from '../config';
const { salt, iterations, keylen } = config.crypto;

export function encrypt (password) {
  const encodedPassword = crypto.pbkdf2Sync(password, salt, iterations, keylen);
  return new Buffer(encodedPassword, 'binary').toString('hex');
}
