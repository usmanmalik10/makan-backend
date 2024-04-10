const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { findRole } = require('../config/roles');
const { getShopByUserId } = require('../services/shop.service');
const { getServiceByUserId } = require('../services/serviceProvider.service');
const { getByUserId } = require('../services/strategicSalePartners.service');
const {
  User,
  StrategicSalePartner,
  RealEstate,
  Shop,
  ServiceProvider,
} = require('../models');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const countUsers = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const shopCount = await Shop.countDocuments();
    const sspCount = await StrategicSalePartner.countDocuments();
    const realEstateCount = await RealEstate.countDocuments();
    const serviceProviderCount = await ServiceProvider.countDocuments();
    // Repeat for other models

    console.log('user count ', userCount);
    const counts = {
      users: userCount,
      shops: shopCount,
      strategicSalePartners: sspCount,
      realState: realEstateCount,
      ServiceProviders: serviceProviderCount,
      // Repeat for other models
    };

    console.log('counts of all user', counts);

    return res.status(200).json(counts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; 

const getUserByToken = catchAsync(async (req, res) => {
  // Assuming req.user is set by your authentication middleware 
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  // Retrieve user information from the database
  let user = await userService.getUserById(req.user._id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.role === findRole('shopKeeper')) {
    const userId = user._id;
    console.log(`userId ${userId}`);
    // Fetch shop details associated with the user ID
    const shopDetails = await getShopByUserId( userId );
    console.log(`Empty shop ${shopDetails}`);
    // If shop details exist, merge it with the user data
    if (shopDetails) {

      // Convert both Mongoose documents to plain objects and merge safely
      user = { ...user.toObject(), shop: shopDetails.toObject() };
    }
  }
  // Check if the user is of type 'shopKeeper'
  else if (user.role === findRole('serviceProvider')) {
    const userId = user._id;
    console.log(`userId ${userId}`);
    // Fetch shop details associated with the user ID
    const serviceDetails = await getServiceByUserId(userId);
    console.log(`Empty service ${serviceDetails}`);
    // If shop details exist, merge it with the user data
    if (serviceDetails) {
      // Convert both Mongoose documents to plain objects and merge safely
      user = { ...user.toObject(), service: serviceDetails.toObject() };
    }
  }

  // Check if the user is of type 'strategicSalePartner'
  else if (user.role === findRole('strategicSalePartner')) {
    const userId = user._id.toString();
    // Fetch StrategicSalePartner data using the user's ID
    const sspData = await getByUserId(userId);

    // If StrategicSalePartner data exists, merge it with the user data
    if (sspData) {
      
      user = { ...user.toObject(), ssp : sspData.toObject() };
    }
  }

 
  res.send({user});
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  countUsers,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserByToken
};
