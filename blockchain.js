const Block = require("./block")

const MINING_DIFFICULTY = 3;

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