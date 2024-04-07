const { STRIPE_SECRET_KEY } = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const createCustomer = async (req, res) => {

  const reqBody = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      description: "Software development services",
      shipping: {
        name: reqBody.name,
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
      amount: Number(reqBody.price) * 100,
      currency: "usd",
    });
    // console.log("paymentIntent", paymentIntent);
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating PaymentIntent" });
  }
};

module.exports = {
  createCustomer,
};
