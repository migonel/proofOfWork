// const crypto = require('crypto');

// function Wallet(blockchainAdress){
//     this.funds = 0;
//     this.blockchainAdress = blockchainAdress;
//     this.privateKey = this.generatePrivateKey();
//     this.publicKey = this.generatePublicKey(this.privateKey);
// };

// Wallet.prototype.generatePrivateKey = function(){
//     let privateKey = crypto.randomBytes(32).toString('hex');
//     return privateKey;
// };

// Wallet.prototype.generatePublicKey = function(privateKey) {
//     return crypto.createHash('sha256').update(privateKey).digest('hex');
// };

// let walletA = new Wallet();
// console.log(walletA.privateKey);
// console.log(walletA.publicKey);