const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { api } = require('../utils/messages');
const { Shop, ServiceProvider } = require('../models/index');

const updateService = async (data, userId) => {
  console.log('UserId related to Service:', userId);

   try {
    const { referralKeyShop } = data;
    console.log(`referral key Shop ${referralKeyShop}`);

    const existingReferralKey = await Shop.findOne({
      referralKeyShop
    });
    console.log('Shop related to referralKeyShop', existingReferralKey);

    if (existingReferralKey) {

      const service = await ServiceProvider.findOne({ userId, active: false });
      console.log('Service related to userId', service);

      if (service && service.active === "false") { 

        // Update service fields based on incoming data
        service.serviceImage = data.serviceImage || null;
        service.longitute = data.longitute || null;
        service.latitude = data.latitude || null;
        service.category = data.category || null;
        service.contractorName = data.contractorName || null;
        service.areaOfService = data.areaOfService || null;
        service.province = data.province || null;
        service.contectNumber = data.contectNumber || null;
        service.address = data.address || null;
        service.laborRates = data.laborRates || null;
        service.chargingSchedule = data.chargingSchedule || null;
        service.referralKeyShop = referralKeyShop || null;
        // service.referralKeyService = ServiceReferralKey || null;
        service.shopId = existingReferralKey._id || null;
        // Set status and active fields
        service.status = true;
        service.active = true;
        // Save the updated service
        await service.save();
        console.log('Service updated:', service);

        return service;
      } else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Service is already active');
      }
    }
  } catch (error) {
    console.error('Invalid referralKey Error updating service:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error updating service'
    );
  }
};

const show = async (options, filter) => {
  try {
    const service = await ServiceProvider.paginate(filter, options);
    return service;
  } catch (e) {
    return false;
  }
};

const get = async (_id) => {
  try {
    const service = await ServiceProvider.findOne({ _id: _id });
    return service;
  } catch (e) {
    return false;
  }
};
const getServiceByUserId = async (userId) => {
  try {
    const service = await ServiceProvider.findOne({userId});
    return service;
  } catch (e) {
    return false;
  }
};

const update = async (_id, body) => {
  try {
    const service = await ServiceProvider.findOne({ _id: _id });
    await Object.assign(service, body);
    await service.save();
    return service;
  } catch (e) {
    return false;
  }
};

const remove = async (_id) => {
  try {
    const service = await ServiceProvider.deleteOne({ _id: _id });
    return service;
  } catch (e) {
    return false;
  }
};

const findServiceByReferralKey = async (referralKeyShop) => {
  try {
    // Find all shops associated with the referral key
    const Service = await ServiceProvider.find({ referralKeyShop }).exec(); // Ensure the execution using .exec()
    // console.log(`Shops with referral key: ${shops}`); // Logging the shops retrieved

    return Service;
  } catch (error) {
    // Handle errors here
    throw new Error('Error finding shops by referral key', error);
  }
};
module.exports = {
  updateService,
  show,
  get,
  update,
  remove,
  getServiceByUserId,
  findServiceByReferralKey,
};
