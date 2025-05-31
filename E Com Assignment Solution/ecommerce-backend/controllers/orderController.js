const { Order } = require('../models');

exports.placeOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error placing order' });
  }
};


