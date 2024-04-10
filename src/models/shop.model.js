const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const shopSchema = mongoose.Schema(
  {
    category: {
      type: String,
    },
    shopName: {
      type: String,
    },
    productName: {
      type: String,
    },
    areaOfService: {
      type: Array,
    },
    province: {
      type: Array,
    },
    contectNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    NTN: {
      type: String,
    },
    companyName: {
      type: String,
    },
    price: {
      type: String,
    },
    details: {
      type: Object,
    },
    status: {
      type: Boolean,
      default: true,
    },
    shopImage: {
      type: String,
    },
    latitude: Number,
    longitude: Number,
    referralKeySSP: {
      type: String,
    },
    referralKeyShop: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    ssp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'strategicSalePartner', // Reference to the StrategicSalePartner model
    },
    active: {
      type: String,
      default: false,
    },
    sale:{
      type: String,
    }

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
shopSchema.plugin(toJSON);
shopSchema.plugin(mongoosePaginate);
shopSchema.plugin(aggregatePaginate);
shopSchema.set('toObject', { virtuals: true, versionKey: false });
shopSchema.set('toJSON', { virtuals: true, versionKey: false });

/**
 * @typedef Shop
 */
const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
