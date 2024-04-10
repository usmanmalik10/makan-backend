const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const dailyRatesService = require('../../validations/dailyRates.validation');
const dailyRatesController = require('../../controllers/dailyRates.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('all'),
    validate(dailyRatesService.updateRates),
    dailyRatesController.updateRates
  )
  .get(dailyRatesController.getRates);

module.exports = router;
