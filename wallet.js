const{
  saveWallet,
  saveTransaction,
  getAllWallets,
  getWalletByAddress,
  getAllTransactions,
} =  require('./database.js');

class Wallet{
  constructor(address, balance = 100){
    this.address = address;
    this.balance = balance;
    this.transaction = [];
  }


getBalance(){
  return this.balance;
}

getAddress(){
  return this.address;
}

makeTransaction(sender, receiver, amount, network) {
  const senderWallet = network.getWalletByAddress(sender);
  const receiverWallet = network.getWalletByAddress(receiver);

  if (!senderWallet || !receiverWallet) {
    throw new Error('Invalid sender or receiver address');
  }

  if (this.balance >= amount) {
    const transaction = {
      sender: senderWallet.address,
      receiver: receiverWallet.address,
      amount: parseFloat(amount),
    };
    this.transactions.push(transaction);

    this.balance -= amount;
    network.updateBalance(senderWallet.address, -amount);
    network.updateBalance(receiverWallet.address, amount);

    network.addTransaction(transaction); // Add transaction to network

    return transaction;
  } else {
    throw new Error('Insufficient balance');
  }
}


save(){
  saveWallet(this);
}
}

class Transaction {
  constructor (sender, receiver, amount){
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
  }
}

module.exports = {
  Wallet,
  Transaction,
};
