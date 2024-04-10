const httpStatus = require('http-status');
const { Shop, StrategicSalePartner } = require('../models/index');
const ApiError = require('../utils/ApiError');
const { api } = require('../utils/messages');
const generateReferralKey = require('../utils/referralKey');

const create = async (data, userId) => {
  try {
    console.log(`userId related to shop ${userId}`);
    const generateReferralKeyShop = await generateReferralKey(); // Generating the referral
    console.log(`Referral Key generated ${generateReferralKeyShop}`);

    const { referralKeySSP } = data;
    console.log(`referral Key SSP ${referralKeySSP}`);
    // Check if the referralKey exists in the StrategicSalePartner collection
    const existingReferralKey = await StrategicSalePartner.findOne({
      referralKeySSP,
    });

    console.log(`existingReferralKey key found ${existingReferralKey}`);

    if (existingReferralKey) {
      //Find shop from shop model that is newly created during user registration and inactive 
      const shop = await Shop.findOne({ userId, active: false });
       
      console.log(`shop related to userId is find ${shop}`);

      if (shop && shop.active === 'false') {
        console.log('Updating shop...');
        console.log('Shop found:', shop);

        shop.category = data.category || null;
        shop.shopName = data.shopName || null;
        shop.productName = data.productName || null;
        shop.areaOfService = data.areaOfService || null;
        shop.province = data.province || null;
        shop.contectNumber = data.contectNumber || null;
        shop.address = data.address || null;
        shop.NTN = data.NTN || null;
        shop.companyName = data.companyName || null;
        shop.price = data.price || null;
        shop.details = data.details || {};
        shop.latitude = data.latitude || null;
        shop.longitude = data.longitude || null;
        shop.shopImage = data.shopImage || null;
        shop.referralKeySSP = referralKeySSP; // accepting referralKey of SSP
        shop.referralKeyShop = generateReferralKeyShop; // generating referal for shop
        shop.ssp = existingReferralKey._id;
        shop.active = true;
        shop.sale = data.sale;

        console.log('Shop to update:', shop);

        try {
          await shop.save();
          console.log('Shop updated:', shop);
          return shop;
        } catch (error) {
          console.error('Error saving shop:', error);
          throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Error saving shop'
          );
        }
      } else {
        // console.log('Active shop ');
        throw new ApiError(httpStatus.BAD_REQUEST, 'Shop is already active ');
      }
    }
  } catch (error) {
    console.error(' Invalid referralKeySSP Error updating shop:', error);
    return false;
  }
};

const findShopsByReferralKey = async (referralKeySSP) => {
  try {
    // Find all shops associated with the referral key
    const shops = await Shop.find({ referralKeySSP }).exec(); // Ensure the execution using .exec()
    // console.log(`Shops with referral key: ${shops}`); // Logging the shops retrieved

    return shops;
  } catch (error) {
    // Handle errors here
    throw new Error('Error finding shops by referral key', error);
  }
};

const show = async (options, filter) => {
  try {
    const shop = await Shop.paginate(filter, options);
    return shop;
  } catch (e) {
    return false;
  }
};

const get = async (_id) => {
  try {
    const shop = await Shop.findOne({ _id: _id });
    return shop;
  } catch (e) {
    return false;
  }
};
const getSaleShop = async (sale) => {
  try {
    const shopsWithSales = await Shop.find({
      sale: { $ne: null, $exists: true },
    });
    return shopsWithSales;
  } catch (e) {
    return false;
  }
};
const getShopByUserId = async (userId) => {
  try {
    const shop = await Shop.findOne({userId}); // Ensuring userId is a string
    return shop;
  } catch (error) {
    console.error('Error fetching shop:', error);
    return false;
  }
};

const update = async (_id, body) => {
  try {
    const shop = await Shop.findOne({ _id: _id });
    await Object.assign(shop, body);
    await shop.save();
    return shop;
  } catch (e) {
    return false;
  }
};

const remove = async (_id) => {
  try {
    const shop = await Shop.deleteOne({ _id: _id });
    return shop;
  } catch (e) {
    return false;
  }
};

const findOneByReferralKey = async (referralKeyShop) => {
  try {
    const shop = await Shop.findOne({
      referralKeyShop,
    });
    console.log("this is shop.service file ", shop);
    return shop;
  } catch (error) {
    // Handle errors here
    throw new Error('Error finding StrategicSalePartner by referral key');
  }
};

module.exports = {
  create,
  show,
  get,
  getSaleShop,
  getShopByUserId,
  update,
  remove,
  findShopsByReferralKey,
  findOneByReferralKey,
};
