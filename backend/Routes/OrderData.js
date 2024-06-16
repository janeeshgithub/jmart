const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  const { order_data, order_date, email } = req.body;

  // Basic validation
  if (!order_data || !order_date || !email) {
    return res
      .status(400)
      .send({ error: "Bad Request", message: "Missing required fields" });
  }

  try {
    let data = order_data;
    data.splice(0, 0, { Order_date: order_date });

    console.log("Received order data:", req.body);

    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      // Create a new order record if the email does not exist
      await Order.create({
        email,
        order_data: [data],
      });
      console.log("New order created for email:", email);
      res.json({ success: true, message: "Order created successfully" });
    } else {
      // Update the existing order record if the email exists
      await Order.findOneAndUpdate({ email }, { $push: { order_data: data } });
      console.log("Order updated for email:", email);
      res.json({ success: true, message: "Order updated successfully" });
    }
  } catch (error) {
    console.error("Error processing order:", error.message);
    res.status(500).send({ error: "Server Error", message: error.message });
  }
});
router.post("/myOrderData", async (req, res) => {
  try {
    console.log(req.body.email);
    let eId = await Order.findOne({ email: req.body.email });
    //console.log(eId)
    res.json({ orderData: eId });
  } catch (error) {
    res.send("Error", error.message);
  }
});

module.exports = router;
