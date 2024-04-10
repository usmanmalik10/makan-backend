const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { chargingScheduleEnum } = require('../config/serviceProvider');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const serviceProviderSchema = mongoose.Schema(
  {
    serviceImage:{
      type: String,
    },
    longitute:Number,
    latitute:Number,
    category: {
      type: String,
    },
    contractorName: {
      type: String,
    },
    areaOfService: {
      type: Array,
    },
    contectNumber: {
      type: String,
    },
    province: {
      type: Array,
    },
    address: {
      type: String,
    },
    laborRates: {
      type: String,
    },
    chargingSchedule: {
      type: String,

      enum: chargingScheduleEnum,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
    },
    referralKeyShop: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    active: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
serviceProviderSchema.plugin(toJSON);
serviceProviderSchema.plugin(mongoosePaginate);
serviceProviderSchema.plugin(aggregatePaginate);

serviceProviderSchema.set('toObject', { virtuals: true, versionKey: false });
serviceProviderSchema.set('toJSON', { virtuals: true, versionKey: false });

/**
 * @typedef ServiceProvider
 */
const ServiceProvider = mongoose.model(
  'ServiceProvider',
  serviceProviderSchema
);

module.exports = ServiceProvider;
