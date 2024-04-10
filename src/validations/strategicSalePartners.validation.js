const Joi = require('joi');
const { objectId } = require('../utils/Helper');

const create = {
  body: Joi.object().keys({
    profilePic: Joi.string().required(),
    idCardFront: Joi.string().required(),
    idCardBack: Joi.string().required(),
    username: Joi.string().required(),
    email_phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
    cnicNumber: Joi.string().required(),
    contactNumber: Joi.string().required(),
    address: Joi.string().required(),
    province: Joi.string().required(),
    city: Joi.string().required(),
  }),
};

const show = {
  query: Joi.object().keys({
    // Define query parameters if needed
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
    profilePicture: Joi.string().required(),
    idCardPics: Joi.object()
      .keys({
        front: Joi.string().required(),
        back: Joi.string().required(),
      })
      .required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
    cnicNumber: Joi.string().required(),
    contactNumber: Joi.string().required(),
    address: Joi.string().required(),
    province: Joi.string().required(),
    city: Joi.string().required(),
  }),
};

module.exports = {
  create,
  show,
  get,
  update,
};
