const Joi = require("joi");
const { objectId } = require('../utils/Helper')


const create = {
  body: Joi.object().keys({
    category: Joi.string().required().valid("house", "plot"),
    subCategory: Joi.string().required().valid("sale", "rent"),
    address: Joi.string().required(),
    location: Joi.string().required(),
    size: Joi.string().required(),
    contectNumber: Joi.string().required(),
    bedRooms: Joi.number().allow(""),
    price: Joi.string().required(),
    details: Joi.object().required(),
  }),
};

const show = {
  query: Joi.object().keys({
    userId: Joi.string(),
    category: Joi.string().required(),
    subCategory: Joi.string().required(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
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
    category: Joi.string().required().valid("house", "plot"),
    subCategory: Joi.string().required().valid("sale", "rent"),
    address: Joi.string().required(),
    location: Joi.string().required(),
    size: Joi.string().required(),
    contectNumber: Joi.string().required(),
    bedRooms: Joi.number().allow(""),
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
