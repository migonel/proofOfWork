const crypto = require('crypto');

function Block(nonce, transactions, previousHash){
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = nonce;
}

Block.prototype.calculateHash = function(){
    return crypto.createHash("sha256").update(this.timestamp + JSON.stringify(this.transactions) + this.previousHash).digest("hex")
}


// const myBlock = new Block(0, "Transacciones",1);
// console.log(myBlock.hash);
// console.log(JSON.stringify(myBlock));

module.exports = Block;