const express = require('express');
const Blockchain = require("../blockchain");
const app = express();
const port = 3001;

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

// Generates random transactions in the blockchain
app.post("/blockchain/transactions", (req,res) => {
    const newTransactions = myBlockchain.generateRandomTransactions();
  
    res.json({ message: "New transactions added to the transaction pool", transactions: newTransactions });
});

// Mines the pending transactions
app.post("/blockchain/mine", (req, res) => {
  myBlockchain.Mining();

  res.status(200).json({ message: "Block mined" });
});

//  Test an inputed nonce value to check if generates a valid proof of work
app.get("/blockchain/validProof/:nonce", (req, res) => {
    const nonce = req.params.nonce;
    const isValid = myBlockchain.manualValidProof(nonce);
  
    res.json({ isValid });
});

// Get the nonce value that generates a valid proof of work for the next block
app.get("/blockchain/getNonce", (req,res) => {
    const nonce = myBlockchain.testProofOfWork();

    res.json({ nonce });
});

// Get the guessed hash obtained by using an inputed nonce value
app.get('/blockchain/guesshash/:nonce', (req, res) => {
    const nonce = parseInt(req.params.nonce);
    myBlockchain.addTransaction(myBlockchain.blockchainAdress, "THE MINER",  1)
    const transactions = myBlockchain.copyTransctionPool();
    const previousHash = myBlockchain.getLatestBlock().calculateHash();
    const guessHash = myBlockchain.guessHash(nonce, previousHash, transactions);
    myBlockchain.deleteLastTransaction();
    res.json({nonce, guessHash});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));