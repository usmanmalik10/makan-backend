const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const bcrypt = require('bcryptjs'); // Add bcryptjs module for password hashing

const strategicSalePartnersSchema = new mongoose.Schema(
  {
    // Your fields...
    profilePic: { type: String, required: true },
    idCardFront: { type: String, required: true },
    idCardBack: { type: String, required: true },
    username: { type: String, required: true },
    email_phoneNumber: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          const emailPattern = /^(\w+[.-_]?)*\w+@(\w+([.-]?\w+)?)+\.\w{2,}$/;
          const phonePattern = /^(\+92)?(0)?\d{10}$/;
          return emailPattern.test(value) || phonePattern.test(value);
        },
        message: 'Contact should be a valid email or phone number',
      },
    },
    password: { type: String, required: true },
    cnicNumber: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    status: {
      type: Boolean,
      default: true,
    },
    referralKeySSP: { type: String, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
 
// Adding plugins and configuring schema options
strategicSalePartnersSchema.plugin(toJSON);
strategicSalePartnersSchema.plugin(mongoosePaginate);
strategicSalePartnersSchema.plugin(aggregatePaginate);
strategicSalePartnersSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
});
strategicSalePartnersSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});

//hashing the password
strategicSalePartnersSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Creating the model based on the schema
const StrategicSalePartners = mongoose.model(
  'strategicSalePartner',
  strategicSalePartnersSchema
);

// StrategicSalePartners.createIndexes((err) => {
//   if (err) {
//     console.error('Error creating indexes:', err);
//   }
// });
module.exports = StrategicSalePartners;
