const express = require('express');
const emailController = require('../controllers/email.controller');

const router = express.Router();

/**
 * @route POST /api/email/order-confirmation
 * @desc Send order confirmation email
 * @access Public
 */
router.post('/order-confirmation', emailController.sendOrderConfirmation);

module.exports = router;