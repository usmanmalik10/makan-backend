const Joi = require("joi");
const { objectId } = require("../utils/Helper");

const create = {
  body: Joi.object().keys({
    category: Joi.string().required(),
    serviceImage: Joi.string().required(),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    contractorName: Joi.string().required(),
    areaOfService: Joi.array().items(Joi.string()).required(),
    province: Joi.array().items(Joi.string()).required(),
    contectNumber: Joi.string().required(),
    address: Joi.string().required(),
    laborRates: Joi.string().required(),
    chargingSchedule: Joi.string().required(),
    referralKeyShop: Joi.string().required(),
  }),
};

const show = {
  query: Joi.object().keys({
    userId: Joi.string(),
    category: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const get = {
  params: Joi.object().keys({
    serviceId: Joi.string().custom(objectId).required(),
  }),
};

const update = {
  params: Joi.object().keys({
    serviceId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    contractorName: Joi.string().required(),
    areaOfService: Joi.array().items(Joi.string()).required(),
    contectNumber: Joi.string().required(),
    address: Joi.string().required(),
    laborRates: Joi.string().required(),
    chargingSchedule: Joi.string().required(),
  }),
};

module.exports = {
  create,
  show,
  get,
  update,
};
