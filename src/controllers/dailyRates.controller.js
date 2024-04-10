const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Helper = require('../utils/Helper');
const { api } = require('../utils/messages');
const { dailyRates } = require('../services/index');

const updateRates = catchAsync(async (req, res) => {
  const updatedRates = await dailyRates.updateRates(req.body);

  res
    .status(httpStatus.OK)
    .send(
      Helper.apiResponse(
        httpStatus.OK,
        api.dailyRates.storeSuccess,
        updatedRates
      )
    );
});

const getRates = catchAsync(async (req, res) => {
  const rates = await dailyRates.getRates();

  res
    .status(httpStatus.OK)
    .send(Helper.apiResponse(httpStatus.OK, api.dailyRates.getSuccess, rates));
});

module.exports = {
  updateRates,
  getRates,
};
