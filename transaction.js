//Transaction class
function Transaction(sender, recipient, value){
    this.senderBlockchainAddress = sender;
    this.recipientBlockchainAddress = recipient;
    this.value = value;
};

module.exports = Transaction;