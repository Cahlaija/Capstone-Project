const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();


// Middleware
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());


// Routes
app.use("/products", productRoutes);
app.use("/auth", authRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Inventory API is running");
});


// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });