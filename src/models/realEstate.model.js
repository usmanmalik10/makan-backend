const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const realEstateSchema = mongoose.Schema(
  {
    category:{
        type:String,
        required: true,
        enum: ['house', 'plot']
      },
    subCategory:{
        type:String,
        required: true,
        enum: ['sale', 'rent']
    },
    shopAddress: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    location:{
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true
    },
    contectNumber: 
    {
        type: String,
        required: true,
    },
    bedRooms: {
        type:Number,
    },
    price: {
      type:String,
      required: true,
    },
    details: {
      type: Object
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status : {
      type: Boolean,
      default: true,
    },
    images: {
        type: Array
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
realEstateSchema.plugin(toJSON);
realEstateSchema.plugin(mongoosePaginate);
realEstateSchema.plugin(aggregatePaginate);


realEstateSchema.set('toObject', { virtuals: true, versionKey: false });
realEstateSchema.set('toJSON', { virtuals: true, versionKey: false });




/**
 * @typedef RealEstate
 */
const RealEstate = mongoose.model('RealEstate', realEstateSchema);

module.exports = RealEstate;
