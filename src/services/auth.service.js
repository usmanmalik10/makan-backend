const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { roles, findRole } = require('../config/roles');
const { getShopByUserId } = require('./shop.service');
const { getByUserId } = require('./strategicSalePartners.service');
const {getServiceByUserId}=require("./serviceProvider.service");

const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    // Fetch user data based on the provided email
    let user = await userService.getUserByEmail(email);

    // If the user does not exist or the password is incorrect, throw an Unauthorized error
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Incorrect email or password'
      );
    }

    // Check if the user is of type 'shopKeeper'
    if (user.role === findRole('shopKeeper')) {
      const userId = user._id; 
      console.log(`userId ${userId}`);
      // Fetch shop details associated with the user ID
      const shopDetails = await getShopByUserId( userId );
      console.log(`Empty shop ${shopDetails}`);
      // If shop details exist, merge it with the user data
      if (shopDetails) {

        // Convert both Mongoose documents to plain objects and merge safely
        user = { ...user.toObject(), shop: shopDetails.toObject() };
      }
    }
    // Check if the user is of type 'shopKeeper'
    else if (user.role === findRole('serviceProvider')) {
      const userId = user._id;
      console.log(`userId ${userId}`);
      // Fetch shop details associated with the user ID
      const serviceDetails = await getServiceByUserId(userId);
      console.log(`Empty service ${serviceDetails}`);
      // If shop details exist, merge it with the user data
      if (serviceDetails) {
        // Convert both Mongoose documents to plain objects and merge safely
        user = { ...user.toObject(), service: serviceDetails.toObject() };
      }
    }

    // Check if the user is of type 'strategicSalePartner'
    else if (user.role === findRole('strategicSalePartner')) {
      const userId = user._id.toString();
      // Fetch StrategicSalePartner data using the user's ID
      const sspData = await getByUserId(userId);
      console.log("ssp Data", sspData);
      // If StrategicSalePartner data exists, merge it with the user data
      if (sspData) {
        
        user = { ...user.toObject(), ssp : sspData.toObject() };
      }
    }

    // Return the user object containing additional details if they exist
    return user;
  } catch (error) {
    // Handle any error that might occur during the process
    throw error;
  }
};


// const loginUserWithEmailAndPassword = async (email, password) => {
//   try {
//     let user = await userService.getUserByEmail(email);
//     if (!user || !(await user.isPasswordMatch(password))) {
//       throw new ApiError(
//         httpStatus.UNAUTHORIZED,
//         'Incorrect email or password'
//       );
//     }
//       if (user.role === findRole('shopKeeper')) {
//         const userId = user._id.toString(); // string representation of the user ID
//         const shopDetails = await Shop.findOne({ userId });

//         if (shopDetails) {
//           // Include shop details for shopKeeper user in the response
//           user.shop = shopDetails;
//         }
//       }

//     // Assuming `findRole` is synchronous and returns the role string.
//     if (user.role === findRole('strategicSalePartner')) {
//       const userId = user._id.toString(); //string representation of the user ID and this is CreatedBy or Admin userId
//       const sspData = await getByUserId(userId);
//       if (sspData) {
//         // Convert Mongoose documents to plain objects
//         const userObject = user._doc;
//         const sspDataObject = sspData._doc;

//         // Merge the two objects, ensuring no conflicts
//         user = {
//           ...userObject,
//           ...sspDataObject,
//           // Ensure that the _id that is preserved is the correct one, for example
//           _id: userObject._id,
//           id: userObject._id,
//         };
//       }
//     }

//     return user;
//   } catch (error) {
//     // Handle any errors that might have occurred during the process
//     throw error; // Or handle it accordingly
//   }
// };

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};


