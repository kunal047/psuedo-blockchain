import { privateDecrypt, constants } from 'crypto';
import { readFileSync } from 'fs';

export const decryptText = (base64Encrypted: string) => {
  const encryptedText = Buffer.from(base64Encrypted, 'base64')
  return privateDecrypt(
    {
      key: readFileSync('private_key.pem', 'utf8'),
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    },
    encryptedText
  ).toString();
}