function Transaction(sender, recipient, value){
    this.senderBlockchainAddres = sender;
    this.recipientBlockchainAddress = recipient;
    this.value = value;
    this
};

module.exports = Transaction;