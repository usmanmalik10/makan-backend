const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


const dailyRatesSchema = new mongoose.Schema({
  bricksPrice: { type: Number, required: true },
  sandPerSqft: { type: Number, required: true },
  crushPerSqft: { type: Number, required: true },
  plasticPipes: { type: Number, required: true },
  cementPrice: { type: Number, required: true },
  ironBarPerTon: { type: Number, required: true },
  pvcPipes: { type: Number, required: true },
});

// add plugin that converts mongoose to json
dailyRatesSchema.plugin(toJSON);
dailyRatesSchema.plugin(mongoosePaginate);
dailyRatesSchema.plugin(aggregatePaginate);

dailyRatesSchema.set('toObject', { virtuals: true, versionKey: false });
dailyRatesSchema.set('toJSON', { virtuals: true, versionKey: false });

const dailyRates = mongoose.model('dailyRate', dailyRatesSchema);

module.exports = dailyRates;
