import { Worker } from 'bullmq';
import { redisClient } from './db/redis';

const worker = new Worker('block', async job => {
  if (job.data.name === 'message') {
    // save the data to sqlite3
    
  }
});