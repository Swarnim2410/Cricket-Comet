//use npm run dev to run our server..
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const Stripe = require("stripe");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
const PORT = process.env.PORT || 5000;

//connecting database -->

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`Connected to Database`))
  .catch((err) => console.log(err));

/*************************** Login and signup **************************/

//user schema -->

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
});

const userModel = mongoose.model("user", userSchema);

//functions -->

//main api -->

app.get("/", (req, res) => {
  res.send("Server is running");
});

//signup api -->
app.post("/signup", async (req, res) => {
  //console.log(req.body);
  const { email } = req.body;

  try {
    // finding email in the database using await
    const result = await userModel.findOne({ email: email });

    if (result) {
      res.send({ message: "Email-id is already registered", redirect: false });
    } else {
      // creating a new user in database
      const data = new userModel(req.body);
      await data.save();
      res.send({ message: "Registration successful", redirect: true });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//login api -->

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // finding email in the database using await
    const result = await userModel.findOne({ email: email });
    ``;
    if (result) {
      if (result.password === password) {
        const data = {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
        };
        res.send({
          message: `Welcome back ${result.firstName}`,
          redirect: true,
          data,
        });
      } else {
        res.send({ message: "Your password is incorrect", redirect: false });
      }
    } else {
      res.send({ message: "Email-ID is not registered", redirect: false });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/*********************************** Add product *************************************/

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", productSchema);

//save a new product in database -->

app.post("/addproduct", async (req, res) => {
  //console.log(req.body);
  try {
    // creating a new user in database
    const data = new productModel(req.body);
    await data.save();
    res.send({ message: "Product added successfully", redirect: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error", redirect: false });
  }
});

//get all products in an api -->

app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

/************PAYMENT GATEWAY ****************/

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/payment", async (req, res) => {
  //console.log(req.body);

  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1OpqsoSHqSHRGIhr2QFRIa0q" }],

      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enable: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    }

    const session = await stripe.checkout.session.create(params);
    res.status(200).json(session.id);
  } catch (error) {
    res.status(err.statusCode || 500).json(error.message);
  }
});

//running server -->

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
