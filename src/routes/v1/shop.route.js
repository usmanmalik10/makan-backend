const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const shopValidation = require('../../validations/shop.validation');
const shopController = require('../../controllers/shop.controller');
const {shopImage} = require("../../ImageUploader/shopImage");
const router = express.Router();

router
  .route('/')
  .post(
    auth('all'),
    shopImage,
    validate(shopValidation.create),
    shopController.create
  )
  .get(validate(shopValidation.show), shopController.show);

// The rest of your routes...

router.get(
  '/userId',
  auth('all'),
  validate(shopValidation.show),
  shopController.getByUserId
);
router.get(
  '/sale',
  // auth('all'),
  shopController.getSaleShop
);
router
  .route('/referral-service')
  .get(auth('all'), shopController.getServiceByReferralKey);
router
  .route('/:id')
  .get(validate(shopValidation.get), shopController.get)
  .patch(auth('all'), validate(shopValidation.update), shopController.update)
  .delete(auth('all'), validate(shopValidation.get), shopController.remove);

module.exports = router;
