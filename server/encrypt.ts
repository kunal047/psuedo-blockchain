import { publicEncrypt, constants } from 'crypto';
import { readFileSync } from 'fs';

export const encryptText = (plainText: string) => {
  return publicEncrypt(
      {
        key: readFileSync("public_key.pem", "utf8"),
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      // We convert the data string to a buffer
      Buffer.from(plainText)
    )
    .toString("base64");
};