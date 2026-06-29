const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// IMPORT MODEL (IMPORTANT)
const Product = require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json());

/* ========================
   TEST ROUTE
======================== */
app.get("/", (req, res) => {
    res.send("Backend is running successfully 🚀");
});

/* ========================
   UPDATE PRODUCT
======================== */
app.put("/api/items/:id", async (req, res) => {
    try {
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

        res.json({
            message: "Product updated successfully",
            item: updated
        });

    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
});

/* ========================
   START SERVER
======================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});