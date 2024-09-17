const mongoose = require("mongoose");


const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
    taste: {
    type: String,
    enum: ["sweet", "salty", "spicy"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredient : {
    type: [String],
    required: true,
    
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;