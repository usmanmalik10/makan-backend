const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const Helper = require('../utils/Helper');
const { api } = require('../utils/messages');
const {
  strategicSalePartner,
  userService,
  shop,
} = require('../services/index');
const {roles , findRole } = require("../config/roles")

const create = catchAsync(async (req, res) => {
  // console.log('true', req.body);
  const {
    username,
    email_phoneNumber: email,
    password,
    contactNumber: phoneNumber,
  } = req.body;
  const sspUser = await userService.createUser({
    username,
    email,
    password,
    role: findRole('strategicSalePartner'),
    phoneNumber,
  });   //user created with role ssp 
  console.log(`user registration in user model role ssp ${sspUser}`);


  const strategicSalePartners = await strategicSalePartner.create(
    req.body,
    sspUser._id // ssp user id for relation with mongoose User model 
  );

  console.log(sspUser);

  if (!strategicSalePartners && !sspUser) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(
        Helper.apiResponse(
          httpStatus.BAD_REQUEST,
          api.strategicSalePartner.storeError
        )
      );
  } else {
    res
      .status(httpStatus.CREATED)
      .send(
        Helper.apiResponse(
          httpStatus.CREATED,
          api.strategicSalePartner.storeSuccess,
          strategicSalePartners
        )
      );
  }
});


const show = catchAsync(async (req, res) => {
  const options = pick(req.query, ['limit', 'page']);
  const filter = {};
  const strategicSalePartners = await strategicSalePartner.show(
    options,
    filter
  );
  // console.log('true', strategicSalePartners);

  if (!strategicSalePartners) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(
        Helper.apiResponse(
          httpStatus.BAD_REQUEST,
          api.strategicSalePartner.NotFound
        )
      );
  } else {
    res
      .status(httpStatus.OK)
      .send(
        Helper.apiResponse(httpStatus.OK, api.success, strategicSalePartners)
      );
  }
});

const getShopsByReferralKey = async (req, res) => {
  try {
    const { referralKeySSP } = req.query;


    console.log(`console for see referral key ${referralKeySSP}`);

    const ssp = await strategicSalePartner.findOneByReferralKey(referralKeySSP); // Remove the object {}
    // console.log(`console for see ssp${ssp}`);

    if (!ssp) {
      return res
        .status(404)
        .send('SSP not found for the provided referral key.');
    }

    const shops = await shop.findShopsByReferralKey(referralKeySSP);
    // console.log(`this is shop on all store page ${shops}`)
    return res.status(200).json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    return res.status(500).send('Internal Server Error');
  }
};



// const getByUserId = catchAsync(async (req, res) => {
//   const options = pick(req.query, ['limit', 'page']);
//   if (req.query.sortBy) {
//     options.sort = {};
//     // eslint-disable-next-line prefer-destructuring
//     options.sort[req.query.sortBy.split(':')[0]] =
//       req.query.sortBy.split(':')[1];
//   }
//   const filter = {
//     status: true,
//     userId: req.query.userId ? req.query.userId : req.user._id,
//   };
//   const strategicSalePartners = await strategicSalePartner.show(
//     options,
//     filter
//   );
//   if (!strategicSalePartners) {
//     res
//       .status(httpStatus.BAD_REQUEST)
//       .send(
//         Helper.apiResponse(
//           httpStatus.BAD_REQUEST,
//           api.strategicSalePartner.NotFound
//         )
//       );
//   } else {
//     res
//       .status(httpStatus.OK)
//       .send(
//         Helper.apiResponse(httpStatus.OK, api.success, strategicSalePartners)
//       );
//   }
// });
const get = catchAsync(async (req, res) => {
  const strategicSalePartners = await strategicSalePartner.get(req.params.id);
  if (!strategicSalePartners) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(
        Helper.apiResponse(
          httpStatus.BAD_REQUEST,
          api.strategicSalePartner.NotFound
        )
      );
  } else {
    res
      .status(httpStatus.OK)
      .send(
        Helper.apiResponse(httpStatus.OK, api.success, strategicSalePartners)
      );
  }
});

const update = catchAsync(async (req, res) => {
  const strategicSalePartners = await strategicSalePartner.update(
    req.params.id,
    req.body
  );
  if (!shops) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(
        Helper.apiResponse(
          httpStatus.BAD_REQUEST,
          api.strategicSalePartner.updateError
        )
      );
  } else {
    res
      .status(httpStatus.OK)
      .send(
        Helper.apiResponse(
          httpStatus.OK,
          api.strategicSalePartner.updateSuccess,
          strategicSalePartners
        )
      );
  }
});

const remove = catchAsync(async (req, res) => {
  const strategicSalePartners = await strategicSalePartner.remove(
    req.params.id
  );
  if (!strategicSalePartners) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(
        Helper.apiResponse(
          httpStatus.BAD_REQUEST,
          api.strategicSalePartner.NotFound
        )
      );
  } else {
    res
      .status(httpStatus.OK)
      .send(
        Helper.apiResponse(
          httpStatus.OK,
          api.strategicSalePartner.deleteSuccess
        )
      );
  }
});

module.exports = {
  create,
  show,
  get,
  update,
  remove,
  getShopsByReferralKey,
};
