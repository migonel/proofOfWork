const express = require('express');
const Blockchain = require("../blockchain");
const app = express();
const port = 3000;

app.use(express.json()); // parse JSON requests
app.use(express.urlencoded({ extended: true })); // parse URL-encoded requests

const myBlockchain = new Blockchain("blockchain_address");

app.get('/', (req, res) => res.send('Hello World!'));

// Get the blockchain
app.get("/blockchain", (req, res) => {
  res.status(200).json(myBlockchain);
});

// Get the transaction pool
app.get("/blockchain/transaction-pool", (req, res) => {
  res.status(200).json(myBlockchain.transactionPool);
});

app.post("/blockchain/transactions", (req,res) => {
    const newTransactions = myBlockchain.generateRandomTransactions();
  
    res.json({ message: "New transactions added to the transaction pool", transactions: newTransactions });
});

// Mine the pending transactions
app.post("/blockchain/mine", (req, res) => {
  myBlockchain.Mining();

  res.status(200).json({ message: "Block mined" });
});


app.get("/blockchain/validProof/:nonce", (req, res) => {
    const nonce = req.params.nonce;
    const isValid = myBlockchain.manualValidProof(nonce);
  
    res.json({ isValid });
});

app.get("/blockchain/getNonce", (req,res) => {
    const nonce = myBlockchain.proofOfWork();

    res.json({ nonce });
});

app.get('/blockchain/guesshash/:nonce', (req, res) => {
    const nonce = parseInt(req.params.nonce);
    const transactions = myBlockchain.copyTransctionPool();
    const previousHash = myBlockchain.getLatestBlock().calculateHash();
    const guessHash = myBlockchain.guessHash(nonce, previousHash, transactions);
    res.json({nonce, guessHash});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));