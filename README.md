# Email Notification API

A superfast email notification API for ecommerce platforms, designed to work with both web and mobile applications.

## Features

- Fast email delivery using Nodemailer
- Order confirmation emails with customizable templates
- Secure API with rate limiting and API key authentication
- Easy integration with web and mobile applications
- Responsive email templates

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

4. Start the server:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

## API Endpoints

### Send Order Confirmation Email

```
POST /api/email/order-confirmation
```

#### Headers

```
Content-Type: application/json
X-API-Key: your-api-key
```

#### Request Body

```json
{
  "email": "customer@example.com",
  "orderNumber": "ORD12345",
  "appUrl": "https://play.google.com/store/apps/your-app"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Order confirmation email sent successfully",
  "data": {
    "success": true,
    "messageId": "<message-id>"
  }
}
```

## Integration Examples

### Web (JavaScript)

```javascript
async function sendOrderConfirmationEmail(orderData) {
  try {
    const response = await fetch('https://your-api-url/api/email/order-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'your-api-key'
      },
      body: JSON.stringify({
        email: orderData.customerEmail,
        orderNumber: orderData.orderNumber,
        appUrl: 'https://play.google.com/store/apps/your-app'
      })
    });
    
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
```

### Mobile (Android - Kotlin)

```kotlin
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface EmailApiService {
    @POST("api/email/order-confirmation")
    suspend fun sendOrderConfirmation(
        @Header("X-API-Key") apiKey: String,
        @Body request: OrderConfirmationRequest
    ): ApiResponse
}

data class OrderConfirmationRequest(
    val email: String,
    val orderNumber: String,
    val appUrl: String
)

data class ApiResponse(
    val status: String,
    val message: String,
    val data: EmailResult?
)

data class EmailResult(
    val success: Boolean,
    val messageId: String?
)

class EmailApiClient {
    private val retrofit = Retrofit.Builder()
        .baseUrl("https://your-api-url/")
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    private val apiService = retrofit.create(EmailApiService::class.java)
    private val apiKey = "your-api-key"

    suspend fun sendOrderConfirmation(email: String, orderNumber: String): ApiResponse {
        val request = OrderConfirmationRequest(
            email = email,
            orderNumber = orderNumber,
            appUrl = "https://play.google.com/store/apps/your-app"
        )
        
        return apiService.sendOrderConfirmation(apiKey, request)
    }
}
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

## License

MIT