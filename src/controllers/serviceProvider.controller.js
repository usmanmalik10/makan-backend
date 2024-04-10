const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const Helper = require("../utils/Helper");
const { api } = require("../utils/messages");
const { serviceProvider } = require("../services/index");

const updateService = catchAsync(async (req, res) => {
  const service = await serviceProvider.updateService(req.body, req.user._id);
  if (!service) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.service.storeError));
  } else {
    res
      .status(httpStatus.OK)
      .send(
        Helper.apiResponse(httpStatus.OK, api.service.storeSuccess, service)
      );
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
  let filter = { status: true};
  if (req.query.category) {
    filter.category = req.query.category
  }
  const service = await serviceProvider.show(options, filter);
  if (!service) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.service.NotFound));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.success, service));
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
  let filter = {
    status: true,
    userId: req.query.userId ? req.query.userId : req.user._id
  };
  if (req.query.category) {
    filter.category = req.query.category
  }
   
  const service = await serviceProvider.show(options, filter);
  if (!service) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.service.NotFound));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.success, service));
  }
});

const get = catchAsync(async (req, res) => {

  const service = await serviceProvider.get(req.params.serviceId);
  if (!service) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.service.NotFound));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.success, service));
  }
});

const update = catchAsync(async (req, res) => {

  const service = await serviceProvider.update(req.params.serviceId, req.body);
  if (!service) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.service.updateError));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.service.updateSuccess, service));
  }
});

const remove = catchAsync(async (req, res) => {

  const service = await serviceProvider.remove(req.params.serviceId);
  if (!service) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.service.NotFound));
  } else {
    res
      .status(httpStatus.OK)
      .send(Helper.apiResponse(httpStatus.OK, api.service.deleteSuccess,));
  }
});

module.exports = {
  updateService,
  show,
  get,
  update,
  remove,
  getByUserId,
};
