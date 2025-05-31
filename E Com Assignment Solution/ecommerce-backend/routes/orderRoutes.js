const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');  

router.post('/orders', orderController.placeOrder);

module.exports = router;
