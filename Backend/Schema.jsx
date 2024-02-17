const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type:String,
    unique:true,
  },
  password: String,
  confirmPassword: String,
});

module.exports = mongoose.model("Product", productSchema);
