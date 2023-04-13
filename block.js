const crypto = require('crypto');

//Block class
function Block(nonce, transactions, previousHash){
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = nonce;
}


//Function to calculate the hash of a block
Block.prototype.calculateHash = function(){
    return crypto.createHash("sha256").update(this.nonce + JSON.stringify(this.transactions) + this.previousHash).digest("hex")
}

Block.prototype.toString = function() {
    return `Block -
        Timestamp  : ${this.timestamp}
        Transactions: ${JSON.stringify(this.transactions)}
        Nonce      : ${this.nonce}
        PreviousHash: ${this.previousHash.substring(0,10)}
        Hash       : ${this.hash.substring(0,10)}`;
};


// const myBlock = new Block(0, "Transacciones",1);
// console.log(myBlock.hash);
// console.log(JSON.stringify(myBlock));

module.exports = Block;