//import axios call api to api
const axios = require('axios');
//
const fs = require('fs');
//file storerage path
const DBPATH = './store/data.json';
// fixer.io api url
const BASEURL = `http://data.fixer.io/api/latest?access_key=${process.env.ACCESS_KEY}`;

//globlal variable
let dbstore = {};

//get data from fixer.io
const fetchDataFromApi = async () => {
    try {
        return axios.get(BASEURL);
    } catch (error) {
        throw error;
    }
}
const initData = async () => {
    try {
        //check if the db file is exiest 
        const isValidFile = await fs.existsSync(DBPATH);
        if (!isValidFile) {
            //no file found 
            //get data from api
            const { data } = await fetchDataFromApi();
            //write data to file as a json
            await fs.promises.writeFile(DBPATH, JSON.stringify(data));
            //set  globlal varilbe to get data 
            dbstore = data;
        } else {
            //check the file expiry date within 24 hours
            //first read the file data
            const fileData = await fs.promises.readFile(DBPATH);
            //conver the file data to json
            const currencyData = JSON.parse(fileData);
            //set  globlal varilbe to get data 
            dbstore = currencyData;
            //check date difference 
            //file created date  and conver timestamp to date
            const lastdate = new Date(currencyData.timestamp * 1000);
            // get difference between two timestamp in hours
            let difference = Date.now() - lastdate;
            //set dbstore time in hours how long the file stores
            let CACHETIMER = new Date().setHours(24);
            console.log(CACHETIMER)
            console.log(difference)

            //check if its pass 24 hours
            if (difference > CACHETIMER) {
                await fs.promises.unlink(DBPATH);
                initData();
            }
        }
    } catch (error) {
        throw error;
    }
}
// to run the initilizeData 
(async () => {
    await initData();
})();

module.exports = {
    getData: (req, res, next) => {


        res.json({
            statusCode: 201,
            status: "Success",
            data: {
                dbstore
            },
            message: "Data Successfully retrive "
        })
        console.log(dbstore)
    },

    convertData: (req, res, next) => {

        try {
            // get data from api
            let rates = dbstore.rates
            //get data data from body
            const fromCurrency = req.body.fromCurrency;
            const amount = req.body.amount;
            const toCurrency = req.body.toCurrency;

            console.log(fromCurrency);
            console.log(amount);
            console.log(toCurrency);

            //req.body validation

            if (
                fromCurrency == null || amount == null || toCurrency == null
            ) {
                res.json({
                    status: "Failed",
                    statusCode: 405,
                    message: "All Fields Require. eg: fromCurrency, amount & toCurrency "
                })
            } else {

                const fromcurrency = rates[fromCurrency]
                const tocurrency = rates[toCurrency]





                //currency vallidation
                if (fromcurrency == null || tocurrency == null) {
                    return res.json({
                        status: "Failed",
                        message: "Invalid Currency To or From "
                    })
                } else {
                    //creatin the base
                    //to currency multiple by amount 
                    base = tocurrency * parseFloat(amount);
                    console.log(fromcurrency, tocurrency);
                    //get the currency conver amount 
                    //base divided by from currency
                    secondconvert = base / fromcurrency;
                    res.json({
                        statusCode: 201,
                        status: "Success",
                        data: {
                            "amount": secondconvert,
                            "currency": toCurrency
                        }

                    })
                }




            }

        } catch (error) {
            console.log(error);
            res.json({
                statusCode: 401,
                status: "FAILED",
                data: error,
                message: "Oh man, Something went wrong, Please try again... "
            })
        }

    }
}
