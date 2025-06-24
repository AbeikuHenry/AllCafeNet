const express = require("express");
const axios = require("axios");
// const RouterOSAPI = require('node-routeros').RouterOSAPI;
const { Routeros } = require("routeros-node");
require("dotenv").config(); // Load environment variables

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mikrotik Paystack Automation Server");
});

app.post("/verify-payment", async (req, res) => {
  console.log("Post request received")
  // const reference = req.body.reference;
  const api = new Routeros({
    host: "192.168.44.73",
    user: "Abei",
    password: "Elizabeth1",
    port: 8728,
  });

  try {
    const conn = await api.connect();

    console.log("Connected to Mikrotik successfully");

    const result = await conn.write([
      "/user/add",
      "=name=test-user",
      "=password=password",
      "=group=write",
      "=comment=Created via Node.js",
      ""
    ]);

    console.log(`User created: ${result}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Payment verification failed");
  } finally {
    api.destroy();
  }
  
  res.json({
    username: "username",
    password: "password",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

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
// const username = "ernest-test";
// const password = Math.random().toString(36).substring(2, 10);