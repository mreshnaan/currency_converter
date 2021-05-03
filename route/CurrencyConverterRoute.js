//importe express router
const router = require('express').Router();
//import controller
const controller =require('../controller/CurrencyConverterController');

router.get('/', controller.getData);
router.post('/',controller.convertData);

module.exports=router;


