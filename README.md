Currency Converter
This application uses  https://fixer.io/

file system is used for in memory database for custom caching

Installation
npm install
npm run start
Modules used

  "dependencies": {
    "axios": "^0.21.1",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "fs": "0.0.1-security"
  }


Usage endpoints
localhost:8080/api/v1/currency

body
{
	"fromCurrency": "LKR",
	"amount": 234.0,
	"toCurrency": "USD"
}

Response
{
    "statusCode": 201,
    "status": "Success",
    "data": {
        "amount": 1.1802933655313503,
        "currency": "USD"
    }
}

Contributing
Pull requests are welcome. For major changes
