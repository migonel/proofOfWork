const Block = require("./block");
const Transaction = require("./transaction");

const MINING_DIFFICULTY = 3;
const MINING_REWARD = 1;
const MINING_SENDER = "THE BLOCKCHAIN"


//Blockchain class
function Blockchain(blockchainAdress){
    this.chain = [this.createFirstBlock()];
    this.transactionPool = [];
    this.blockchainAdress = blockchainAdress;
}

//Fuction that creates the first block in the chain
Blockchain.prototype.createFirstBlock = function(){
    return new Block(0,this.transactionPool ,"First Block");
};

//Function that returns the last block in the chain
Blockchain.prototype.getLatestBlock = function() {
    return this.chain[this.chain.length - 1];
};

//Function to create a block in the chain (append a block to the chain)
Blockchain.prototype.createBlock = function(nonce, previousHash){
    let newBlock = new Block(nonce, this.transactionPool, previousHash);
    this.chain.push(newBlock);
}

//Function to add transactions to the transaction pool
Blockchain.prototype.addTransaction = function(sender, recipient, value) {
    let transaction = new Transaction(sender, recipient, value);
    this.transactionPool.push(transaction);
};

//Function to make a copy of the transaction pool
Blockchain.prototype.copyTransctionPool = function(){
    let transactions = this.transactionPool;
    return transactions;
};

//Function that uses a nonce value, the hash of the previous block and the transactions data, to generate a hash.
//if this hash verify certain conditions, the nonce value can be used as valid proof of work to create a new block
Blockchain.prototype.guessHash = function(nonce, previousHash, transactions){
    let guessBlock = new Block(nonce, previousHash,transactions);
    let guessHash = guessBlock.calculateHash();
    return guessHash;
};

//Boolean function: returns true if the nonce value generated a valid hash as proof
Blockchain.prototype.validProof = function(nonce, previousHash, transactions, difficulty) {
    let guessHash = this.guessHash(nonce,previousHash,transactions);
    return guessHash.substring(0,difficulty) === "000";
};

//Function to that returns the nonce value that generated a valid proof
Blockchain.prototype.proofOfWork = function(){
    transactions = this.copyTransctionPool();
    previousHash = this.getLatestBlock().calculateHash();
    nonce = 0;
    while (this.validProof(nonce, previousHash, transactions, MINING_DIFFICULTY) == false){
        nonce +=1;
    }
    return nonce;
};


//Function to test nonce value manually
Blockchain.prototype.manualValidProof = function(nonce){
    transactions = this.copyTransctionPool();
    previousHash = this.getLatestBlock().calculateHash();
    let guessHash = this.guessHash(nonce, previousHash, transactions);
    return guessHash.substring(0,MINING_DIFFICULTY) == "000"; 

};

//Function to mine a block. Adds a transaction to reward the miner. Returns true if the block was mined
Blockchain.prototype.Mining = function(){
    this.addTransaction(MINING_SENDER, this.blockchainAdress, MINING_REWARD);
    let nonce = this.proofOfWork();
    previousHash = this.getLatestBlock().calculateHash();
    this.createBlock(nonce, previousHash);
    this.transactionPool = [];
    console.log("action=mining, status=success")
    return true;
};

Blockchain.prototype.log = function() {
    console.log("\n\n");
    console.log("########## Blockchain ##########");
    for (let i = 0; i < this.chain.length; i++) {
        console.log('-----------------------------------------------------------')
      console.log(`\nBlock ${i}:\nHash:\t\t${this.chain[i].hash}`);
      console.log(`Previous Hash:\t${this.chain[i].previousHash}`);
      console.log(`Nonce: ${this.chain[i].nonce}`);
      console.log(`Transactions: ${JSON.stringify(this.chain[i].transactions)}`);
      console.log('-----------------------------------------------------------')
    }
    console.log("\n\n");
};


Blockchain.prototype.generateRandomTransactions = function() {
    const senderAddresses = ['A', 'B', 'C', 'D', 'E'];
    const recipientAddresses = ['F', 'G', 'H', 'I', 'J'];
    const values = [1, 2, 3, 4, 5];

    for (let i = 0; i < 3; i++) {
        const sender = senderAddresses[Math.floor(Math.random() * senderAddresses.length)];
        const recipient = recipientAddresses[Math.floor(Math.random() * recipientAddresses.length)];
        const value = values[Math.floor(Math.random() * values.length)];
        this.addTransaction(sender, recipient, value);
    }
};




Blockchain.prototype.getTotalAmountForAddress = function(address) {
    let totalAmount = 0;
  
    for (let i = 1; i < this.chain.length; i++) {
      const block = this.chain[i];
  
      for (let j = 0; j < block.transactions.length; j++) {
        let transaction = block.transactions[j];

        if (JSON.stringify(transaction.senderBlockchainAddress) == JSON.stringify(address)) {
          totalAmount -= transaction.value;
        }
  
        if (JSON.stringify(transaction.recipientBlockchainAddress) == JSON.stringify(address)) {
          totalAmount += transaction.value;
        }
      }
    }
  
    return totalAmount;
};




module.exports = Blockchain;

//Create blockchain to test
let myBlockchain = new Blockchain("blockchain_address");

myBlockchain.generateRandomTransactions();

myBlockchain.log();

// console.log(myBlockchain.manualValidProof(1));
// console.log(myBlockchain.manualValidProof(4));
// console.log(myBlockchain.manualValidProof(1000));
// console.log(myBlockchain.manualValidProof(278));


myBlockchain.Mining();
myBlockchain.log();

myBlockchain.generateRandomTransactions();
myBlockchain.Mining();
myBlockchain.log();


myBlockchain.generateRandomTransactions();
myBlockchain.Mining();
myBlockchain.log();

