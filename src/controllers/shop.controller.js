const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const Helper = require('../utils/Helper');
const { api } = require('../utils/messages');
const { shop, userService, serviceProvider } = require('../services/index');
const { roles, findRole,  } = require('../config/roles');
// const {serviceProvider} = require("../services/serviceProvider.service")

// create function 
const create = catchAsync(async (req, res) => {
  const shops = await shop.create(req.body, req.user._id);
  if (!shops) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.shop.storeError));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.shop.storeSuccess, shops));
  }
});

// Add this method to fetch shop details on user login 
const getShopDetails = catchAsync(async (req, res) => {
  const user = req.user;
  if (user.role === 'shopKeeper') {
    const shopDetails = await Shop.findOne({ userId: user._id });
    res.status(httpStatus.OK).send({ user, shop: shopDetails });
  } else {
    res.status(httpStatus.OK).send({ user });
  }
});

// show function 
const show = catchAsync(async (req, res) => {
  const options = pick(req.query, ['limit', 'page']);

  if (req.query.sortBy) {
    options.sort = {};
    const [sortByField, sortByValue] = req.query.sortBy.split(':');
    options.sort[sortByField] = sortByValue;
  }

  const filter = {};

  if (req.query.productName) {
    filter.productName = req.query.productName;
  }

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if ('status' in req.query) {
    if (req.query.status === 'true') {
      filter.status = true;
    } else if (req.query.status === 'false') {
      filter.status = { $ne: true };
    } else {
      console.log('Invalid value provided for status:', req.query.status);
      // Handle invalid status values differently (e.g., send an error response)
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(
          Helper.apiResponse(httpStatus.BAD_REQUEST, 'Invalid status value')
        );
    }
  }

  const shops = await shop.show(options, filter);

  if (!shops) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.shop.NotFound));
  }

  return res
    .status(httpStatus.OK)
    .send(Helper.apiResponse(httpStatus.OK, api.success, shops));
});

const getByUserId = catchAsync(async (req, res) => {
  const options = pick(req.query, ['limit', 'page']);
  if (req.query.sortBy) {
    options.sort = {};
    // eslint-disable-next-line prefer-destructuring
    options.sort[req.query.sortBy.split(':')[0]] =
      req.query.sortBy.split(':')[1];
  }
  const filter = {
    status: true,
    userId: req.query.userId ? req.query.userId : req.user._id,
  };
  const shops = await shop.show(options, filter);
  if (!shops) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.shop.NotFound));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.success, shops));
  }
});
const get = catchAsync(async (req, res) => {
  const shops = await shop.get(req.params.id);
  if (!shops) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.shop.NotFound));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.success, shops));
  }
});
const getSaleShop = catchAsync(async (req, res) => {
  const shops = await shop.getSaleShop();
  if (!shops) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.shop.NotFound));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.success, shops));
  }
});

const update = catchAsync(async (req, res) => {
  const shops = await shop.update(req.params.id, req.body);
  if (!shops) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.shop.updateError));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.shop.updateSuccess, shops));
  }
});

const remove = catchAsync(async (req, res) => {
  const shops = await shop.remove(req.params.id);
  if (!shops) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.shop.NotFound));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.shop.deleteSuccess));
  }
});

const getServiceByReferralKey = async (req, res) => {
  try {
    const { referralKeyShop } = req.query;

    console.log(`console for see referral key ${referralKeyShop}`);

    const Shop = await shop.findOneByReferralKey(referralKeyShop); // Remove the object {}
    console.log(`this is shop.controller file  ${Shop}`);

    if (!Shop) {
      return res
        .status(404)
        .send('SSP not found for the provided referral key.');
    }

    const shops = await serviceProvider.findServiceByReferralKey(
      referralKeyShop
    );
    // console.log(`this is shop on all store page ${shops}`)
    return res.status(200).json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    return res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  create,
  show,
  get,
  getSaleShop,
  update,
  remove,
  getByUserId,
  getShopDetails,
  getServiceByReferralKey,
};
