const httpStatus = require('http-status');
const { StrategicSalePartner } = require('../models/index');
const ApiError = require('../utils/ApiError');
const { api } = require('../utils/messages');
const generateReferralKey = require('../utils/referralKey');

const create = async (data, userId) => {
  console.log("thisis data ", data);
  console.log("thisis data ", userId);
  try {
    const referralKey = await generateReferralKey(); // Generating the referral key

    const strategicSalePartner = await StrategicSalePartner.create({
      // userId: userId,

      profilePic: data.profilePic,
      idCardFront: data.idCardFront,
      idCardBack: data.idCardBack,
      username: data.username,
      email_phoneNumber: data.email_phoneNumber, 
      password: data.password,
      cnicNumber: data.cnicNumber,
      contactNumber: data.contactNumber,
      address: data.address,
      province: data.province,
      city: data.city,
      // createdBy: createdBy, 
      referralKeySSP: referralKey,
      userId: userId,
    });
console.log(`stretegic sale partner creating ${strategicSalePartner}`);
    if (!strategicSalePartner) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        api.strategicSalePartner.storeError
      );
    }

    return strategicSalePartner; // Return the created strategic sale partner
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      if (error.keyPattern && error.keyValue) {
        const field = Object.keys(error.keyPattern)[0];
        const value = error.keyValue[field];

        console.error(
          `Duplicate key error for field '${field}' with value '${value}'`
        );

        if (field === 'username') {
          throw new Error(`Username '${value}' is already taken.`);
        } else if (field === 'email_phoneNumber') {
          throw new Error(`Email or Phone Number '${value}' already exists.`);
        }
        throw new Error('Duplicate key error');
      }
    }
    console.error('Unexpected error:', error);
    throw new Error('Internal Server Error');
  }
};
// catch (error) {
//   console.error('Error creating strategic sale partner here:', error);

//   // throw new ApiError(
//   //   httpStatus.INTERNAL_SERVER_ERROR,
//   //   'Error creating strategic sale partner there',
//   //   error
//   // );
// }

/**
 * Retrieve a list of strategic sale partners with optional filtering and pagination
 * @param {Object} options - Pagination and sorting options
 * @param {Object} filter - Filtering criteria
 * @returns {Promise<PaginateResult<StrategicSalePartner>>} - Paginated list of strategic sale partners
 */
const show = async (options, filter) => {
  try {
    const strategicSalePartners = await StrategicSalePartner.paginate(
      filter,
      options
    );

    // Remove 'password' field from each document in the response
    const modifiedResults = strategicSalePartners.docs.map((doc) => {
      const { password, ...rest } = doc.toObject();
      return rest;
    });

    // Replace the original documents with the modified ones
    strategicSalePartners.docs = modifiedResults;

    return strategicSalePartners;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error fetching strategic sale partners',
      error
    );
  }
};


// Assuming you have a StrategicSalePartner model in your models folder

// Function to find a StrategicSalePartner by referralKey
const findOneByReferralKey = async (referralKeySSP) => {
  try {
    const strategicSalePartner = await StrategicSalePartner.findOne({
      referralKeySSP,
    });
    // console.log(strategicSalePartner);
    return strategicSalePartner;
  } catch (error) {
    // Handle errors here
    throw new Error('Error finding StrategicSalePartner by referral key');
  }
};




/**
 * Get a strategic sale partner by ID
 * @param {string} _id - The ID of the strategic sale partner
 * @returns {Promise<StrategicSalePartner>} - The strategic sale partner
 */
const get = async (_id) => {
  try {
    const strategicSalePartner = await StrategicSalePartner.findOne({ _id });
    return strategicSalePartner;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error getting strategic sale partner',
      error
    );
  }
};


const getByUserId = async (userId) => {
  try {
    const strategicSalePartner = await StrategicSalePartner.findOne({ userId });
    return strategicSalePartner;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error getting strategic sale partner',
      error
    );
  }
};
/**
 * Update a strategic sale partner by ID
 * @param {string} _id - The ID of the strategic sale partner
 * @param {Object} body - Updated data
 * @returns {Promise<StrategicSalePartner>} - The updated strategic sale partner
 */
const update = async (_id, body) => {
  try {
    const strategicSalePartner = await StrategicSalePartner.findOne({ _id });
    if (!strategicSalePartner) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Strategic sale partner not found'
      );
    }
    Object.assign(strategicSalePartner, body);
    await strategicSalePartner.save();
    return strategicSalePartner;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error updating strategic sale partner',
      error
    );
  }
};

/**
 * Remove a strategic sale partner by ID
 * @param {string} _id - The ID of the strategic sale partner to be removed
 * @returns {Promise<boolean>} - Indicates success or failure
 */
const remove = async (_id) => {
  try {
    const result = await StrategicSalePartner.deleteOne({ _id });
    if (result.ok === 1 && result.deletedCount > 0) {
      return true;
    } else {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Strategic sale partner not found'
      );
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error removing strategic sale partner',
      error
    );
  }
};

module.exports = {
  create,
  show,
  get,
  update,
  remove,
  getByUserId,
  findOneByReferralKey,
};
