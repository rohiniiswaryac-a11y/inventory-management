const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./models/Product");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* ================= DB CONNECTION ================= */
connectDB();

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

/* ================= GET ALL ITEMS ================= */
app.get("/api/items", async (req, res) => {
    const items = await Product.find();
    res.json(items);
});

/* ================= ADD ITEM ================= */
app.post("/api/items", async (req, res) => {
    const { name, quantity, price } = req.body;

    const newItem = new Product({
        name,
        quantity,
        price,
        total: quantity * price
    });

    await newItem.save();
    res.json({ message: "Item added successfully" });
});

/* ================= UPDATE ITEM ================= */
app.put("/api/items/:id", async (req, res) => {
    const { name, quantity, price } = req.body;

    const updated = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name,
            quantity,
            price,
            total: quantity * price
        },
        { new: true }
    );

    res.json({ message: "Updated successfully", item: updated });
});

/* ================= DELETE ITEM ================= */
app.delete("/api/items/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});