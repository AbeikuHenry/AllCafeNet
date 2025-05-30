const express = require('express');
const axios = require('axios');
const RouterOSAPI = require('node-routeros').RouterOSAPI;
const { Routeros } = require("routeros-node");
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Mikrotik Paystack Automation Server');
});

app.post('/verify-payment', async (req, res) => {
  // const reference = req.body.reference;

  try {
    // Verify payment with Paystack API
    // const paystackResponse = await axios({
    //   url: `https://api.paystack.co/transaction/verify/${reference}`,
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
    //   }
    // });

    // const transactionData = paystackResponse.data.data;
    // const amount = transactionData.amount;
    // const customerEmail = transactionData.customer.email;

    // Mikrotik User Creation
    // const username = Math.random().toString(36).substring(2, 10);
    // const password = Math.random().toString(36).substring(2, 10);
    const username = "ernest-test";
    const password = Math.random().toString(36).substring(2, 10);

    const api = new Routeros({
      host: process.env.MIKROTIK_HOST,
      user: process.env.MIKROTIK_USER,
      password: process.env.MIKROTIK_PASSWORD,
      port: 8728
    });

    try {
      const conn = await api.connect();
      console.log('Connected to Mikrotik');
      try {
        await conn.write(['/ip/hotspot/user/add', `=name=${username}`, `=password=${password}`]);
        console.log(`User created: ${username} with password: ${password}`);
      } catch (error) {
        console.error('Failed to create user:', error);
        return res.status(500).send('Failed to create user on Mikrotik');
      }
    } catch (error) {
      console.error('Failed to connect to Mikrotik:', error);
      return res.status(500).send('Failed to connect to Mikrotik');
    }
    // await api.connect();

    // await api.write('/ip/hotspot/user/add', {
    //   name: username,
    //   password: password
    // });


    api.destroy();

    res.json({
      username: username,
      password: password
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Payment verification failed');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
