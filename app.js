require('dotenv').config();
const express = require('express');
const ejs = require("ejs");
const bodyParser = require('body-parser');
const Network = require('./network');
const { Wallet } = require('./wallet');
const { getAllWallets, getWalletByAddress } = require('./database');



const app = express();
const network = Object.create(Network);


app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  res.render("home");
});

app.use(bodyParser.json());


app.get('/wallets/all', (req, res) => {
  getAllWallets((wallets) => {
    res.json(wallets);
  });
});

app.get('/wallet/:address', (req, res) => {
  const { address } = req.params;
  getWalletByAddress(address, (wallet) => {
    if (wallet) {
      res.json(wallet);
    } else {
      res.status(404).json({ error: 'Wallet not found' });
    }
  });
});

app.post('/wallet/make-transaction', async (req, res) => {
  const { sender, receiver, amount } = req.body;
console.log(req.body);
  try {
    const senderWallet = sender;

    const receiverWallet = receiver;


    const transaction = {
      sender: senderWallet,
      receiver: receiverWallet,
      amount: parseFloat(amount),
    };

    network.addTransaction(transaction);
    // network.updateBalance(senderWallet, amount);
    // network.updateBalance(receiverWallet, amount);

    network.updateBalance(sender, -amount);
    network.updateBalance(receiver, amount);

    res.json({
      message: 'Transaction successful',
      transaction,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





app.listen(3000, () => {
  console.log('Server started on port 3000');
});
