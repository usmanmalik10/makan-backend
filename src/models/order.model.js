const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    status: {
        type: String,
        enum: ['completed', 'pending', 'rejected']

    },
    date: {
        type: Date,
        require: true
    },
    modelId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    model: {
        type: String,
        enum: ['Shop', 'ServiceProvider', 'RealEstate'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);




/**
 * @typedef UserOrder
 */
const order = mongoose.model('order', orderSchema);

module.exports = order;
