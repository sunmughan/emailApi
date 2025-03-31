/**
 * Middleware to authenticate API requests using API key
 */
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized: Invalid API key'
    });
  }
  
  next();
};

module.exports = {
  apiKeyAuth
};