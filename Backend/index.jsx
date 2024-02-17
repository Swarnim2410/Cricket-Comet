//use npm run dev to run our server..
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
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
  console.log(req.body);
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
  immage: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", productSchema);

//save product in database -->

app.post("/addproduct",(req,res)=>{
    console.log(req.body)
})

//running server -->
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
