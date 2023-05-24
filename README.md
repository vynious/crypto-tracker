

# Crypto Portfolio Tracker

## Summary

Application uses the MVC design pattern that connections to a custom-made API with different endpoints of different functionalities (located under `api_routes`). 
Overall, the main purpose of the application is to help users keep track of the valuation and cost of their purchased cryptocurrencies without being affected by the spread commonly seen cryptocurrency exchanges. This allows them to more accurately keep track of their portfolio.

Data Powered by CoinGecko's Free Crypto API

## Functionalities

The users can search for coins, which will display the details of the coins. The users can also add these coins into their current assets which helps keep track of their overall portfolio. The users can input the 1. fees incurred when purchasing, 2. currency used and 3. quantity purchased. Under their current assets page, the users will be able to see the cost price that the transaction (of buying that coin in X currency), and also the current valuation of their 
assets. the users can view their current assets portfolio in whichever currency they choose, either in fiat or crypto currencies. Their cost price and current valuation will be adjusted based on their preference according. 


## API Endpoints

### API routes (`/api/coin`)

- `"/"`: List all coins
  - POST method
  - Requires JWT authentication
  - Validates JWT token using the `validateToken` middleware
  - Retrieves coins data from CoinGecko API and returns as JSON

- `"/search/:id"`: Search specific coin
  - POST method
  - Requires JWT authentication
  - Validates JWT token using the `validateToken` middleware
  - Retrieves coin details from CoinGecko API based on the provided ID and returns as JSON

- `"/top"`: List top 7 trending coins
  - POST method
  - Requires JWT authentication
  - Validates JWT token using the `validateToken` middleware
  - Retrieves top 7 coins data from CoinGecko API and returns as JSON

- `"/:id/buy"`: Add coin to current assets
  - POST method
  - Requires JWT authentication
  - Validates JWT token using the `validateToken` middleware
  - Creates a transaction model and saves it in the database
  - Updates the asset model for the specific user with the coin and quantity purchased

- `"/:id/sell"`: Sell coin from current assets
  - POST method
  - Requires JWT authentication
  - Validates JWT token using the `validateToken` middleware
  - Creates a transaction model for the sell transaction and saves it in the database
  - Updates the asset model for the specific user by subtracting the sold quantity

### API Route (`/api/user`)

- `"/profile"`: Display user profile details
  - POST method
  - Requires JWT authentication
  - Validates JWT token using the `validateToken` middleware
  - Retrieves and displays user details from the user model without revealing the password

- `"/profile/logout"`: Logout of account
  - Removes JWT token from authentication or requires a new login to invalidate the token

- `"/profile/current-assets"`: Display user's current assets
  - POST method
  - Requires JWT authentication
  - Validates JWT token using the `validateToken` middleware
  - Accepts the target currency in the request body
  - Retrieves all user transactions based on the user ID
  - Calculates the cost of purchase and current valuation based on the target currency
  - Uses currency conversion to calculate the cost of purchase if in crypto and provides real-time valuation

### API Route (`/auth`)

- `"/register"`: Create a new account
  - POST method
  - Accepts username, email, and password in the request body
  - Creates a new user account in the database

- `"/login"`: Login to account
  - POST method
  - Accepts email and password in the request body
  - Generates a JWT token for authentication
  - Subsequent requests should use the JWT token for authentication


## Tech Stack

- Database: MongoDB
- Backend: Node.js, Express.js
- Frontend: EJS, Vanilla JS




https://github.com/vynious/crypto-tracker/assets/77824606/b01e747b-6709-424c-ad7a-cc8a5be59fbe





