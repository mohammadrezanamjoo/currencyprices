const express = require('express');
const request = require('request');
const app = express();

// Set the API endpoint URL and API key
const apiUrl = 'https://api.exchangeratesapi.io/latest';
const apiKey = 'AU43-ERTW-78162874';

// Define a route for handling GET requests to the /currency/latest endpoint
app.get('/currency/latest', (req, res) => {
  // Set the base currency and target currency
  const baseCurrency = req.query.base || 'USD';
  const targetCurrency = req.query.target || 'EUR';

  // Make a GET request to the API endpoint with the API key included in the headers
  const options = {
    url: `${apiUrl}?base=${baseCurrency}&symbols=${targetCurrency}`,
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (response.statusCode !== 200) {
      console.error(`Status code: ${response.statusCode}`);
      res.status(response.statusCode).json({ error: 'API error' });
    } else {
      // Parse the JSON response body
      const data = JSON.parse(body);

      // Extract the target currency price from the response data
      const price = data.rates[targetCurrency];

      res.json({ price });
    }
  });
});

// Define a route for handling GET requests to the /currency/historical endpoint
app.get('/currency/historical', (req, res) => {
  // Set the date, base currency, and target currency
  const date = req.query.date || 'latest';
  const baseCurrency = req.query.base || 'USD';
  const targetCurrency = req.query.target || 'EUR';

  // Make a GET request to the API endpoint with the API key included in the headers
  const options = {
    url: `${apiUrl}/${date}?base=${baseCurrency}&symbols=${targetCurrency}`,
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (response.statusCode !== 200) {
      console.error(`Status code: ${response.statusCode}`);
      res.status(response.statusCode).json({ error: 'API error' });
    } else {
      // Parse the JSON response body
      const data = JSON.parse(body);

      // Extract the target currency price from the response data
      const price = data.rates[targetCurrency];

      res.json({ price });
    }
  });
});

// Define a route for handling GET requests to the /currency/symbols endpoint
app.get('/currency/symbols', (req, res) => {
  // Make a GET request to the API endpoint with the API key included in the headers
  const options = {
    url: `${apiUrl}/symbols`,
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (response.statusCode !== 200) {
      console.error(`Status code: ${response.statusCode}`);
      res.status(response.statusCode).json({ error: 'API error' });
    } else {
      // Parse the JSON response body
      const data = JSON.parse(body);

      res.json({ symbols: data.symbols });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
