const { getWalletByAddress, saveWallet, saveTransaction, updateWalletBalance } = require('./database');

class Wallet {
  constructor(address, balance = 100) {
    this.address = address;
    this.balance = balance;
  }
}

const Network = {
  wallets: {},
  feePercentage: 0.01,
  transactions: [],

  async loadWalletsFromDatabase() {
    const wallets = await getWallets();
    console.log(wallets);
    for (const wallet of wallets) {
      this.wallets[wallet.address] = new Wallet(wallet.address, wallet.balance);
    }
  },

  async createWallet(address) {
      const existingWallet = await this.getWalletByAddress(address);
      if (!existingWallet) {
        const wallet = new Wallet(address);
        this.wallets[address] = wallet;
        await saveWallet(wallet);
        return wallet;
      } else {
        throw new Error('Wallet already exists');
      }
    },


  getWallets() {
    return Object.values(this.wallets);
  },

  async getWalletByAddress(address) {
    console.log(address);
    const wallet = await getWalletByAddress(address);
    return wallet;

  },

  async updateBalance(address, amount) {
    console.log("address is ", address);
    const wallet = await getWalletByAddress(address);
    console.log(wallet);
    if (wallet) {
      wallet.balance += amount;
      console.log(wallet.balance);
      await updateWalletBalance(address, wallet.balance);
    } else {
      throw new Error('Wallet not found');
    }
  },

  getFee(amount) {
    return amount * this.feePercentage;
  },

  collectFee(address, amount) {
    const wallet = this.wallets[address];
    if (wallet) {
      wallet.balance -= amount;
      console.log('Fee collected:', amount);
    } else {
      throw new Error('Wallet not found');
    }
  },


  async addTransaction(transaction) {
    await saveTransaction(transaction);
    this.transactions.push(transaction);
  },

  getAllTransactions() {
    return this.transactions;
  },
};

module.exports = Network;
