const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51N85LMSH082yDvIOxi7wrBkr3DpBeBTlxguOUHOt6kKgKbD3Gpj0RI4c8MsgpGLzYd01dTinBOCRX7YHNXYb1D8v00jxVdVmBO');

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeRes, stripeErr) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
        console.log(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;