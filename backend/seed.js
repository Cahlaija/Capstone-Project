const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    name: "Laptop",
    sku: "LAP-001",
    category: "Electronics",
    quantity: 10,
    price: 899.99
  },
  {
    name: "Keyboard",
    sku: "KEY-001",
    category: "Electronics",
    quantity: 25,
    price: 49.99
  },
  {
    name: "Office Chair",
    sku: "CHR-001",
    category: "Furniture",
    quantity: 5,
    price: 199.99
  }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products seeded");

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Seed error:", error);
    mongoose.connection.close();
  });