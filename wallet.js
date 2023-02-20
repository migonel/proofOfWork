const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

function Wallet(blockchainAdress){
    this.funds = 0;
    this.privateKey = this.generatePrivateKey();
    this.publicKey = this.generatePublicKey(this.privateKey);
    this.blockchainAdress = this.generateBlockchainAdress(this.publicKey);
};

Wallet.prototype.generatePrivateKey = function() {
  const keyPair = ec.genKeyPair();
  const privateKey = keyPair.getPrivate('hex');
  return privateKey;
};

Wallet.prototype.generatePublicKey = function(privateKey) {
  const keyPair = ec.keyFromPrivate(privateKey);
  const publicKey = keyPair.getPublic('hex');
  return publicKey;
};

Wallet.prototype.generateBlockchainAdress = function(publicKey) {
  const publicKeyBytes = Buffer.from(publicKey, 'hex');
  const publicKeyHash = crypto.createHash('sha256').update(publicKeyBytes).digest();
  const address = publicKeyHash.toString('hex');
  return address;
};

let walletA = new Wallet("address");
console.log(walletA.publicKey);
console.log(walletA.privateKey);
console.log(walletA.publicKey);
console.log(walletA.blockchainAdress);
