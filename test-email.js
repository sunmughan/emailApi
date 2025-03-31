require('dotenv').config();
const fetch = require('node-fetch');

/**
 * Simple test script to demonstrate sending an order confirmation email
 */
async function testOrderConfirmationEmail() {
  try {
    // Replace with your actual API endpoint if deployed elsewhere
    const apiUrl = 'http://localhost:3000/api/email/order-confirmation';
    
    // Test data
    const testData = {
      email: 'customer@example.com', // Replace with a real email for testing
      orderNumber: 'TEST12345',
      appUrl: 'https://play.google.com/store/apps/your-app' // Replace with your actual app URL
    };
    
    console.log('Sending test email with data:', testData);
    
    // Send request to the API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.API_KEY // Make sure API_KEY is set in your .env file
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Email sent successfully!');
      console.log('Response:', JSON.stringify(result, null, 2));
    } else {
      console.error('❌ Failed to send email');
      console.error('Error:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('❌ Exception occurred:', error.message);
  }
}

// Run the test
testOrderConfirmationEmail();

console.log('💡 Note: Make sure your server is running and .env file is properly configured');
console.log('💡 To run this test: node test-email.js');