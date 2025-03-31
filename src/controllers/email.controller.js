const Joi = require('joi');
const emailService = require('../services/email.service');

/**
 * Controller for handling email-related operations
 */
class EmailController {
  /**
   * Send order confirmation email
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async sendOrderConfirmation(req, res, next) {
    try {
      // Validate request body
      const schema = Joi.object({
        email: Joi.string().email().required(),
        orderNumber: Joi.string().required(),
        appUrl: Joi.string().uri().required()
      });

      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: 'error',
          message: error.details[0].message
        });
      }

      // Send email
      const result = await emailService.sendOrderConfirmation({
        to: value.email,
        orderNumber: value.orderNumber,
        appUrl: value.appUrl
      });

      return res.status(200).json({
        status: 'success',
        message: 'Order confirmation email sent successfully',
        data: result
      });
    } catch (error) {
      console.error('Error in sendOrderConfirmation controller:', error);
      next(error);
    }
  }
}

module.exports = new EmailController();