const Block = require("./block")

const MINING_DIFFICULTY = 3;
const MINING_REWARD = 1;
const MINING_SENDER = "THE BLOCKCHAIN"

function Blockchain(blockchainAdress){
    this.chain = [this.createFirstBlock()];
    this.transactionPool = [];
    this.blockchainAdress = blockchainAdress;
}

Blockchain.prototype.createFirstBlock = function(){
    return new Block("First Block", "0");
};

Blockchain.prototype.getLatestBlock = function() {
    return this.chain[this.chain.length - 1];
};

Blockchain.prototype.createBlock = function(nonce, previousHash){
    let newBlock = new Block(nonce, this.transactionPool, previousHash);
    this.chain.push(newBlock);
}

Blockchain.prototype.addTransaction = function(sender, recipient, value) {
    let transaction = new Transaction(sender, recipient, value);
    this.transactionPool.push(transaction);
};

Blockchain.prototype.copyTransctionPool = function(){
    let transactions = this.transactionPool;
    return transactions;
};

Blockchain.prototype.validProof = function(nonce, previousHash, transactions, difficulty) {
    let guessBlock = new Block(nonce,previuosHash,transactions);
    let guessHash = guessBlock.calculateHash();
    return guessHash.substring(0,difficulty) === "000";
};

Blockchain.prototype.proofOfWork = function(){
    transactions = this.copyTransctionPool();
    previousHash = this.getLatestBlock().calculateHash();
    nonce = 0;
    while (this.validProof(nonce, previousHash, transactions, MINING_DIFFICULTY) == false){
        nonce +=1;
    }
    return nonce;
}

Blockchain.prototype.Mining = function(){
    this.addTransaction(MINING_SENDER, this.blockchainAdress, MINING_REWARD);
    nonce = this.proofOfWork;
    previousHash = bc.getLatestBlock().calculateHash();
    this.createBlock(nonce, previousHash);
    console.log("action=mining, status=success")
    return true;
}