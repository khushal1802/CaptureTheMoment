const express = require("express");
const config = require("./config/config.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./db/dbConnection.js");
const routes = require("./routes/v1");
require("./helper/crons.js");
const stripe = require("stripe")(
  "sk_test_51OqT6aSJuCh9MehJRX13jvk979avHLNhTqhAXxX9SUsGSt1o5ZUBw7Rmzp3KRLLZrAlpyJHDA6fdKFhJgEgRZiJX003z9JKawC"
);

const PORT = config.port || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({ origin: config.origin, credentials: true }));
app.use(bodyParser.json());

/** route */
app.use("/v1", routes);

/** Database connection funcation */
connectDB();

app.listen(PORT, () => {
  console.log(`Created server on the port http://localhost:${PORT}`);
});
