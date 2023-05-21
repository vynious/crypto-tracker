


backend for crypto portfolio application

SUMMARY: 

API with different endpoints of that has different functionalities.
Overall, it helps keep track of their crypto purchases without being 
affected by the spread on crypto exchanges. This provides a more accurate 
tracking of their portfolio. 

The users can search for coins, which will display the details of the coins.

The users can also add these coins into their current assets which helps keep track 
of their overall portfolio. The users can input the 1. fees incurred when purchasing,
2. currency used and 3. quantity purchased. 

Under their current assets page, the users will be able to see the cost price that the 
transaction (of buying that coin in X currency), and also the current valuation of their 
assets. 

the users can view their current assets portfolio in whichever currency they choose, either in 
fiat or crypto currencies. Their cost price and current valuation will be adjusted based on their
preference according. 


---------------------------------------------------------------------------------------

PAGES:

Landing Page: User's Current Assets

Search Page: Top 7 trending coins +  Search bar for specific coins

Coin Page: Details of the coin

Adding-to-Assets Page/Pop-up: Asking for input for Qty, Fees, Unit, Type and Unit Name

Login Page: User email and password

Register Page: Username, email and password


---------------------------------------------------------------------------------------


("/"); -> list all coins
    - POST method
    - JWT in Auth
    - runs validateToken to check for JWT token
        - if yes -> req.user = decoded.user
    - API call to CoinGecko and returns all coins in json


("/search/:id"); -> search specific coin 
    - POST method
    - runs validateToken to check for JWT token
        - if yes -> req.user = decoded.user
    - API call to CoinGecko and return detail of searched coin


("/top"); -> list top 7 trending coins
    - POST method
    - JWT in Auth
    - runs validateToken to check for JWT token
        - if yes -> req.user = decoded.user
    - API call to CoinGecko and returns top7 coins in json


("/:id/buy"); -> add coin to current assets
    - POST method
    - JWT in Auth
    - runs validateToken to check for JWT token
        - if yes -> req.user = decoded.user
    - creates a transaction model and saves in the db
    - update the asset model for the specific user w the coin and quantity
    - eg. {
        "quantity": 3,
        "fees": 0,
        "unit": "sgd",
        "type": "fiat"
        }



("/:id/sell"); -> add coin to current assets
    - POST method
    - JWT in Auth
    - runs validateToken to check for JWT token
        - if yes -> req.user = decoded.user
    - creates a transaction model and saves in the db
    - update the asset model for the specific user w the coin and quantity 
    - eg. {
        "quantity": 3,
        "fees": 0,
        "unit": "btc",
        "unit_name": "bitcoin"
        "type": "crypto"
        }


("/profile"); -> display profile details
    - POST method
    - JWT in Auth
    - runs validateToken to check for JWT token
        - if yes -> req.user = decoded.user
    - display user details in user model without showing the password


("/profile/logout"); -> logout of account
    - removes JWT from auth or run login again but dont save in auth


("/profile/current-assets"); -> display account's current assets
    - POST method
    - JWT in Auth
    - runs validateToken to check for JWT token
        - if yes -> req.user = decoded.user
    - takes in { "target" : currency } in req.body
    - display out all transactions done by the user based on user_id
    - calculate the cost of purchase and current valuation based on req.body
    - the currency conversion uses XX -> btc -> YY, where XX is the currency purchased in
    and YY is the currency to user decides to view in. 
    - cost of purchase if in crypto, calls API to check price of that crypto during the date of
    purchase 
    - true valuation takes runs currency conversion of current realtime prices and sum up all assets 


("/register"); -> create an account
    - POST
    - username, email , password in req.body
    - create in db


("/login"); -> login to account 
    - POST
    - email , password in req.body
    - generate jwt token 
    - *use jwt token for subsequent queries
    


---------------------------------------------------------------------------------------




Backend for Crypto Portfolio Application

SUMMARY:
This is an API that provides various endpoints with different functionalities to help users track their crypto purchases accurately. It eliminates the impact of spread on crypto exchanges, providing a more precise portfolio tracking experience. Users can search for coins, view coin details, add coins to their current assets, and monitor their portfolio's cost price and valuation in their preferred currency.

PAGES:

Landing Page: User's Current Assets
Search Page: Top 7 trending coins + Search bar for specific coins
Coin Page: Details of the coin
Adding-to-Assets Page/Pop-up: Input fields for Qty, Fees, Unit, Type, and Unit Name
Login Page: User email and password
Register Page: Username, email, and password
API ENDPOINTS:

("/"): List all coins
POST method
Requires JWT authentication
Validates JWT token using the validateToken middleware
Retrieves coins data from CoinGecko API and returns as JSON

("/search/:id"): Search specific coin
POST method
Requires JWT authentication
Validates JWT token using the validateToken middleware
Retrieves coin details from CoinGecko API based on the provided ID and returns as JSON

("/top"): List top 7 trending coins
POST method
Requires JWT authentication
Validates JWT token using the validateToken middleware
Retrieves top 7 coins data from CoinGecko API and returns as JSON

("/:id/buy"): Add coin to current assets
POST method
Requires JWT authentication
Validates JWT token using the validateToken middleware
Creates a transaction model and saves it in the database
Updates the asset model for the specific user with the coin and quantity purchased

("/:id/sell"): Sell coin from current assets
POST method
Requires JWT authentication
Validates JWT token using the validateToken middleware
Creates a transaction model for the sell transaction and saves it in the database
Updates the asset model for the specific user by subtracting the sold quantity

("/profile"): Display user profile details
POST method
Requires JWT authentication
Validates JWT token using the validateToken middleware
Retrieves and displays user details from the user model without revealing the password

("/profile/logout"): Logout of account
Removes JWT token from authentication or requires a new login to invalidate the token

("/profile/current-assets"): Display user's current assets
POST method
Requires JWT authentication
Validates JWT token using the validateToken middleware
Accepts the target currency in the request body
Retrieves all user transactions based on the user ID
Calculates the cost of purchase and current valuation based on the target currency
Uses currency conversion to calculate the cost of purchase if in crypto and provides real-time valuation

("/register"): Create a new account
POST method
Accepts username, email, and password in the request body
Creates a new user account in the database

("/login"): Login to account
POST method
Accepts email and password in the request body
Generates a JWT token for authentication
Subsequent requests should use the JWT token for authentication