# Currency Converter


This application uses https://fixer.io/.

file system is used for in memory database for custom caching.


### Installation

```sh
npm install
npm run dev
```
# Modules used
###  Dependencies

```sh
 "axios": "^0.21.1"
 "cors": "^2.8.5"
 "dotenv": "^8.2.0"
 "express": "^4.17.1"
 "fs": "0.0.1-security"
```






### Usage endpoints
```sh
  localhost:8080/api/v1/currency
```


### body
```sh
  {
	"fromCurrency": "LKR",
	"amount": 234.0,
	"toCurrency": "USD"
}

```

### Response
```sh
{
    "statusCode": 201,
    "status": "Success",
    "data": {
        "amount": 1.1802933655313503,
        "currency": "USD"
    }
}

```


Contributing
Pull requests are welcome. For major changes,
Thank you!!
