const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const Helper = require('../utils/Helper');
const { api } = require('../utils/messages')
const {realEstate} = require('../services/index')


const create = catchAsync(async (req, res) => {
    const realEstates = await realEstate.create(req.body, req.user._id)
    if (!realEstates) {
      res.status(httpStatus.BAD_REQUEST).send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.real.storeError));
    } else {
      res.status(httpStatus.OK).send(Helper.apiResponse(httpStatus.OK, api.real.storeSuccess, realEstates));
    }
  });

const show = catchAsync(async (req, res) => {
  const options = pick(req.query, ["limit", "page"]);
  if (req.query.sortBy) {
    options.sort = {};
    // eslint-disable-next-line prefer-destructuring 
    options.sort[req.query.sortBy.split(":")[0]] =
      req.query.sortBy.split(":")[1];
  }
  const filter = {
    status: true,
    category: req.query.category,
    subCategory: req.query.subCategory,
  };
  const realEstates = await realEstate.show(options, filter);
  if (!realEstates) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.real.NotFound));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.success, realEstates));
  }
});
const getByUserId = catchAsync(async (req, res) => {
  const options = pick(req.query, ["limit", "page"]);
  if (req.query.sortBy) {
    options.sort = {};
    // eslint-disable-next-line prefer-destructuring
    options.sort[req.query.sortBy.split(":")[0]] =
      req.query.sortBy.split(":")[1];
  }
  const filter = {
    status: true,
    category: req.query.category,
    subCategory: req.query.subCategory,
    userId: req.query.userId ? req.query.userId : req.user._id,
  };
  const realEstates = await realEstate.show(options, filter);
  if (!realEstates) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.real.NotFound));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.success, realEstates));
  }
});

const get = catchAsync(async (req, res) => {
  const realEstates = await realEstate.get(req.params.id);
  if (!realEstates) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.real.NotFound));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.success, realEstates));
  }
});

const update = catchAsync(async (req, res) => {
  const realEstates = await realEstate.update(req.params.id, req.body);
  if (!realEstates) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(
        Helper.apiResponse(httpStatus.BAD_REQUEST, api.real.updateError)
      );
  } else {
    res
      .status(httpStatus.OK)
      .send(
        Helper.apiResponse(httpStatus.OK, api.real.updateSuccess, realEstates)
      );
  }
});

const remove = catchAsync(async (req, res) => {
  const realEstates = await realEstate.remove(req.params.id);
  if (!realEstates) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.real.NotFound));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.real.deleteSuccess));
  }
});

module.exports = {
  create,
  show,
  get,
  update,
  remove,
  getByUserId,
};
  