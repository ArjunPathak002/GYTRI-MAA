const express = require('express');
const router = express.Router();
const Order = require('../model/Orders');

// POST route to handle order data
router.post('/orderData', async (req, res) => {
    try {
        // Get the order data from the request
        let data = req.body.order_data;
        data.unshift({ Order_date: req.body.order_date }); // Add Order_date to the beginning of the data array

        // Check if the email exists in the database
        const eId = await Order.findOne({ 'email': req.body.email });

        if (!eId) {
            // If the email doesn't exist, create a new document
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            // If the email exists, update the existing document by pushing new data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }

        // Send a success response
        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        // Send a server error response with a status code of 500
        res.status(500).send("Server Error: " + error.message);
    }
});


router.post('/myOrderData', async (req, res) => {
    try {
        const eId = await Order.findOne({ 'email': req.body.email });
        res.json({ orderData: eId });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

router.post('/myorderData', async (req, res) => {
    try {
        const myData = await Order.findOne({ 'email': req.body.email });
        res.json({ orderData: myData });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

module.exports = router;
