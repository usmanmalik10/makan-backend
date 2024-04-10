const Joi = require('joi');
const { objectId } = require('../utils/Helper');

const updateRates = {
  body: Joi.object().keys({
    bricksPrice: Joi.number().required(),
    sandPerSqft: Joi.number().required(),
    crushPerSqft: Joi.number().required(),
    plasticPipes: Joi.number().required(),
    cementPrice: Joi.number().required(),
    ironBarPerTon: Joi.number().required(),
    pvcPipes: Joi.number().required(),
  }),
};


const get = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  updateRates,
  get,
};
