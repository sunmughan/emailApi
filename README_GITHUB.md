# Email Notification API

A superfast email notification API for ecommerce platforms, designed to work with both web and mobile applications.

## Features

- Send order confirmation emails
- API key authentication
- Rate limiting to prevent abuse
- Security headers with Helmet
- CORS support
- Responsive email templates

## Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- SMTP server credentials

## Installation

1. Clone this repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/email-notification-api.git
   cd email-notification-api
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Copy the `.env.example` file to `.env` and update the values
   ```bash
   cp .env.example .env
   ```

4. Start the server
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Configuration

Update the `.env` file with your SMTP server details and other configuration options:

- `PORT`: The port on which the API server will run
- `SMTP_HOST`: Your SMTP server hostname
- `SMTP_PORT`: Your SMTP server port
- `SMTP_SECURE`: Set to `true` for SSL connections (port 465), `false` for others
- `SMTP_USER`: Your SMTP username/email
- `SMTP_PASS`: Your SMTP password
- `EMAIL_FROM_NAME`: The sender name for emails
- `EMAIL_FROM_ADDRESS`: The sender email address
- `API_KEY`: A secret key for API authentication

## API Endpoints

### Send Order Confirmation Email

```
POST /api/email/order-confirmation
```

**Headers:**
```
Content-Type: application/json
X-API-Key: your-api-key
```

**Request Body:**
```json
{
  "email": "customer@example.com",
  "orderNumber": "ORD12345",
  "appUrl": "https://play.google.com/store/apps/your-app"
}
```

**Response (Success):**
```json
{
  "status": "success",
  "message": "Email sent successfully",
  "data": {
    "messageId": "<message-id>"
  }
}
```

## Testing

You can test the API using the included test script:

```bash
npm test
```

This will run the `test-email.js` script which sends a test email using your configured SMTP settings.

## Deployment

See [GITHUB_SETUP.md](GITHUB_SETUP.md) for detailed instructions on deploying this API to various platforms.

## Security Considerations

- Never commit your `.env` file to version control
- Regularly update dependencies to patch security vulnerabilities
- Use a strong, unique API key
- Consider implementing IP whitelisting for additional security

## License

MIT