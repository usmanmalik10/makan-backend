const Joi = require('joi');
const { objectId } = require('../utils/Helper');

const create = {
  body: Joi.object().keys({
    category: Joi.string().required(),
    shopName: Joi.string().required(),
    productName: Joi.string(),
    areaOfService: Joi.array().items(Joi.string()).required(),
    province: Joi.array().items(Joi.string()).required(),
    contectNumber: Joi.string().required(),
    address: Joi.string().required(),
    NTN: Joi.string().allow(''),
    companyName: Joi.string(),
    price: Joi.string(),
    details: Joi.object(),
    shopImage: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    referralKeySSP: Joi.string().required(),
    referralKeyShop: Joi.string(),
    sale: Joi.string(),
  }),
};

const show = {
  query: Joi.object().keys({
    category: Joi.string(),
    productName: Joi.string(),
    userId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.string().valid('true', 'false').insensitive(),
  }),
};

const get = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    category: Joi.string().required(),
    shopName: Joi.string().required(),
    productName: Joi.string().required(),
    areaOfService: Joi.array().items(Joi.string()).required(),
    contectNumber: Joi.string().required(),
    address: Joi.string().required(),
    NTN: Joi.string().allow(''),
    companyName: Joi.string().required(),
    price: Joi.string().required(),
    details: Joi.object().required(),
  }),
};

module.exports = {
  create,
  show,
  get,
  update,
};
