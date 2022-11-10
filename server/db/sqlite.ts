import { Database } from 'sqlite3';
import fs from 'fs';
import path from 'path';

// Open a SQLite database, stored in the file db.sqlite
export const db = new Database(path.resolve(__dirname + '/data/blockchain.sqlite'));

// Fetch a random integer between -99 and +99
db.get(
  'SELECT RANDOM() % 100 as result',
  (_, res) => console.log('random int', res)
);
db.exec(fs.readFileSync(__dirname + '/sql/create-entries-table.sql').toString());
db.exec(fs.readFileSync(__dirname + '/sql/create-blocks-table.sql').toString());
