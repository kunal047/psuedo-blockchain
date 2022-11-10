/// <reference lib="dom" />
import { Wallet } from "ethers";
import crypto from "crypto";
import fs from "fs";
import axios from "axios";

const encryptText = (plainText: string) => {
  return crypto
    .publicEncrypt(
      {
        key: fs.readFileSync("public_key.pem", "utf8"),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      // We convert the data string to a buffer
      Buffer.from(plainText)
    )
    .toString("base64");
};
// create a worker class with public and private key
export class Worker {
  public publicKey: string;
  private privateKey: string;
  private nonce: number = 0;

  constructor() {
    // create random wallet
    const wallet = Wallet.createRandom();
    this.privateKey = wallet._signingKey().privateKey;
    this.publicKey = wallet.address;
  }

  signMessage(data: string) {
    const wallet = new Wallet(this.privateKey);
    return wallet.signMessage(data);
  }

  async sendMessage() {
    // generate random message
    const message = Math.random().toString(36).substring(7);
    const data = {
      message,
      publicKey: this.publicKey,
    };

    // sign message
    const signMessage = encryptText(JSON.stringify(data));

    // send request to server every 1 second for 1 minute
    const interval = setInterval(async () => {
      const nonce = (this.nonce += 1);
      // log
      console.log(
        `Sending message ${message} with nonce ${nonce} from ${this.publicKey}`
      );
      // post request from axios to server
      await axios.post("http://localhost:3000", {
        from: this.publicKey,
        signMessage,
        nonce,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, 61000);
  }
}
