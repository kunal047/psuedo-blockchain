import { Worker } from './worker';

// create 10 instances of worker class and send message
for (let i = 0; i < 10; i++) {
  const worker = new Worker();
  worker.sendMessage();
}