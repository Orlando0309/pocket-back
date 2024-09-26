import * as crypto from 'crypto';

function hash(str: string) {
  const hash = crypto.createHash('sha256');
  hash.update(str);
  const crypted = hash.digest('hex');
  return crypted.toString();
}

const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};
const utils = {
  hash,
  generateToken,
};
export default utils;
