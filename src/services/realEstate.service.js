const httpStatus = require('http-status');
const {RealEstate} = require('../models/index')
const ApiError = require('../utils/ApiError');
const {api} = require('../utils/messages')


const create = async (data, userId) => {
  try {
    const realEsate = await RealEstate.create({
        category: data.category,
        subCategory: data.subCategory,
        address: data.address,
        location: data.location,
        size: data.size,
        contectNumber: data.contectNumber,
        bedRooms: data.bedRooms ? data.bedRooms : null,
        price: data.price,
        details: data.details, 
        userId: userId,
    });
    if (!realEsate) {
      throw new ApiError(httpStatus.BAD_REQUEST, api.service.storeErrors);
    }
    return realEsate;
  } catch (e) {
    console.log('error', e);
    return false;
  }
};

const show = async (options, filter) =>{
  try{
    const realEsate = await RealEstate.paginate(filter, options)
    return realEsate
  } catch(e) {
    return false
  }
};

const get = async (_id) => {
  try {
    const realEsate = await RealEstate.findOne({ _id: _id })
    return realEsate;
  } catch(e) {
    return false
  }
};

const update = async (_id, body) => {
  try {
    const realEsate = await RealEstate.findOne({ _id: _id })
    await Object.assign(realEsate, body)
    await realEsate.save();
    return realEsate;
  } catch(e) {
    return false
  }
};

const remove = async (_id) => {
  try {
    const realEsate = await RealEstate.deleteOne({ _id: _id })
    return realEsate;
  } catch(e) {
    return false
  }
};

module.exports = {
  create,
  show,
  get,
  update,
  remove,

}