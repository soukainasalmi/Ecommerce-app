import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY =
  "pk_test_51K3rLhHLYbxdeMU9CzRqBIRjceSvibRxBVmR4Q1A1uWZpSDJCzN8RH0zOylPKXkYO2uFUaQaowWLdj9RN4OVuOV300ahRVMIbV"; //add your PUBLISHABLE KEY here or use .env
const SECRET_KEY =
  "sk_test_51K3rLhHLYbxdeMU9YuxAv0Hju30fXTuSTtXWtCFyOwD04d932wfex8oNyLUIiyGF7oDluQAYV3oYDiZXPNJM6qoO00SH2U8Jhi"; //add your SECRETE KEY here or use .env
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://92.168.0.105:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
