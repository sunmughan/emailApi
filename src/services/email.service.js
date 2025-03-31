const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Create reusable transporter object using SMTP transport
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Send order confirmation email
   * @param {Object} options - Email options
   * @param {string} options.to - Recipient email
   * @param {string} options.orderNumber - Order number
   * @param {string} options.appUrl - Mobile app URL
   * @returns {Promise<Object>} - Nodemailer info object
   */
  async sendOrderConfirmation({ to, orderNumber, appUrl }) {
    try {
      // Prepare email options
      const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME || 'Ecommerce Store'}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to,
        subject: `Order Confirmation #${orderNumber}`,
        html: this.getOrderConfirmationTemplate({ orderNumber, appUrl }),
      };

      // Send email
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Order confirmation email sent: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
      throw error;
    }
  }

  /**
   * Get order confirmation email template
   * @param {Object} data - Template data
   * @param {string} data.orderNumber - Order number
   * @param {string} data.appUrl - Mobile app URL
   * @returns {string} - HTML email template
   */
  getOrderConfirmationTemplate({ orderNumber, appUrl }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #ddd;
          }
          .content {
            padding: 20px;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #777;
            border-top: 1px solid #ddd;
          }
          .button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Your order #${orderNumber} has been placed successfully.</p>
            <p>Please download our App to track your order:</p>
            <p>
              <a href="${appUrl}" class="button">Download Our App</a>
            </p>
            <p>Thank you for shopping with us!</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Ecommerce Store. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();