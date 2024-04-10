const httpStatus = require('http-status');
const { DailyRates } = require('../models/index');
const ApiError = require('../utils/ApiError');
const { api } = require('../utils/messages');

const updateRates = async (data) => {
  console.log('this is data ', data);
  try {
    const existingRates = await DailyRates.findOne();

    if (existingRates) {
      existingRates.set({
        bricksPrice: data.bricksPrice,
        sandPerSqft: data.sandPerSqft,
        crushPerSqft: data.crushPerSqft,
        plasticPipes: data.plasticPipes,
        cementPrice: data.cementPrice,
        ironBarPerTon: data.ironBarPerTon,
        pvcPipes: data.pvcPipes,
      });

      const updatedRates = await existingRates.save();
      console.log(`Daily Rates updated: ${updatedRates}`);
      return updatedRates;
    } else {
      const newRates = await DailyRates.create({
        bricksPrice: data.bricksPrice,
        sandPerSqft: data.sandPerSqft,
        crushPerSqft: data.crushPerSqft,
        plasticPipes: data.plasticPipes,
        cementPrice: data.cementPrice,
        ironBarPerTon: data.ironBarPerTon,
        pvcPipes: data.pvcPipes,
      });

      console.log(`Daily Rates created: ${newRates}`);
      return newRates;
    }
  } catch (error) {
    console.error('Error updating Daily Rates:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error updating Daily Rates'
    );
  }
};

const getRates = async () => {
  try {
    const rates = await DailyRates.findOne();

    if (!rates) {
      throw new ApiError(httpStatus.NOT_FOUND, api.dailyRates.notFound);
    }

    return rates;
  } catch (error) {
    console.error('Error getting Daily Rates:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error getting Daily Rates'
    );
  }
};

module.exports = {
  updateRates,
  getRates,
};
