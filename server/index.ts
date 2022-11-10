import { hashMessage } from '@ethersproject/hash';
import express from 'express';
import { db } from './db/sqlite';
import { decryptText } from './decrypt';
import { encryptText } from './encrypt';

// create an express app listening on port 3000 in typescript
const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// listen to post request on root path
app.post("/", async (req, res) => {
  // get public key and signature from request body
  const { from, signMessage, nonce } = req.body;
  // validate signature using the public key
  const decryptedMessage = decryptText(signMessage);
  const data = JSON.parse(decryptedMessage);
  // validate data 

  if (data.publicKey === from) {
    console.log("Valid signature"); 
    // push message to queue
    // await queue.add('message', { signMessage, from, nonce });
    const hash = hashMessage(signMessage);
    console.log(from, decryptedMessage, hash, nonce);
    db.run('INSERT INTO entries (fromAddress, encryptedData, decryptedData, hash, nonce) VALUES (?, ?, ?, ?, ?)', [from, signMessage, decryptedMessage, hash, nonce]);
    // get count of entries
    db.get('SELECT COUNT(*) as count FROM entries', (err, row) => {
      console.log('inserted entry', row.count);
      // for every 100th entry, create a block
      if (row.count % 100 === 0) {
        const skip = ((row.count / 100) - 1) * 100;
        db.all(`SELECT * FROM entries LIMIT 100 OFFSET ${skip}`, (err, rows) => {
          const entries = JSON.stringify(rows);
          // create hash of all messages
          const hash = hashMessage(JSON.stringify(entries));
          // sign hash with private key
          const signedHash = encryptText(hash);

          // create merkle tree of the messages
          
          
          // get previous block
          db.get('SELECT * FROM blocks ORDER BY id DESC LIMIT 1', (err, row) => {
            if (row) {
              console.log('previous hash', row.hash);
              
              // create block
              db.run('INSERT INTO blocks (hash, entries, previousHash, signedHash) VALUES (?, ?, ?, ?)', [hash, entries, row.hash, signedHash]);
            } else {
              // create block
              db.run('INSERT INTO blocks (hash, entries, signedHash) VALUES (?, ?, ?)', [hash, entries, signedHash]);
            }
            res.send({ status: 'ok' });
          })
        });
      } else {
        res.send({ status: 'ok' });
      }
    });
  } else {
    console.log("Invalid signature");
    res.send({ message: "Invalid signature" });
  }
});

app.get("/blocks/count", (req, res) => {
  // get total count of blocks
  db.get('SELECT COUNT(*) as count FROM blocks', (err, row) => {
    res.send({ totalCount: row.count });
  });
});

// api to get the latest block
app.get("/blocks/latest", (req, res) => {
  // get latest block
  db.get('SELECT * FROM blocks ORDER BY id DESC LIMIT 1', (err, row) => {
    res.send(row);
  });
});

// give a block hash get the previous block
app.get("/blocks/previous/:hash", (req, res) => {
  db.get(`SELECT * FROM blocks WHERE hash = '${req.params.hash}'`, (err, row) => {
    // get previous block
    db.get(`SELECT * FROM blocks WHERE id = ${row.id - 1}`, (err, row) => {
      if (!row) {
        res.send({ message: 'No previous block found' });
      }
      res.send(row);
    });
  });
});

app.get("/blocks/:id", (req, res) => {
  // get block by id
  db.get(`SELECT * FROM blocks WHERE id = ${req.params.id}`, (err, row) => {
    res.send(row);
  });
});


