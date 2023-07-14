const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.USERNAME,
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database');
  }
});

async function saveWallet(wallet) {
  const { address, balance } = wallet;
  const query = 'INSERT INTO wallets (address, balance) VALUES (?, ?)';
  console.log(query);
  try {
    const results = await connection.query(query, [address, balance]);
    console.log('Wallet saved:', results);
    return results;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.warn('Wallet already exists:', address);
    } else {
      console.error('Error saving wallet:', error);
    }
    throw error;
  }
}



async function saveTransaction(transaction) {
  const { sender, receiver, amount } = transaction;
  const query = 'INSERT INTO transactions (sender, receiver, amount) VALUES (?, ?, ?)';

  try {
    const results = await connection.query(query, [sender, receiver, amount]);
    //console.log('Transaction saved:', results);
    return results;
  } catch (error) {
    //console.error('Error saving transaction:', error);
    throw error;
  }
}

function getAllWallets(callback) {
  const query = 'SELECT * FROM wallets';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving wallets:', error);
    } else {
      callback(results);
    }
  });
}

function getWalletByAddress(address) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM wallets WHERE address = ?';
    connection.query(query, [address], (error, results) => {
      if (error) {
        console.error('Error retrieving wallet:', error);
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}


function getAllTransactions(callback) {
  const query = 'SELECT * FROM transactions';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving transactions:', error);
    } else {
      callback(results);
    }
  });
}

async function updateWalletBalance(address, balance) {
  const query = 'UPDATE wallets SET balance = ? WHERE address = ?';

  try {
    const results = await connection.query(query, [balance, address]);
    console.log('Wallet balance updated:', results);
    return results;
  } catch (error) {
    console.error('Error updating wallet balance:', error);
    throw error;
  }
}

module.exports = {
  saveWallet,
  saveTransaction,
  getAllWallets,
  getWalletByAddress,
  getAllTransactions,
  updateWalletBalance,
};
