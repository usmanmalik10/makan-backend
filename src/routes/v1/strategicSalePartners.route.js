const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const strategicSalePartnerValidation = require('../../validations/strategicSalePartners.validation');
const strategicSalePartnersController = require('../../controllers/strategicSalePartners.controller');
const { sspImage } = require('../../ImageUploader/sspImage');

const router = express.Router();

router
  .route('/')
  .post(
    auth('all'),
    sspImage,
    validate(strategicSalePartnerValidation.create),
    strategicSalePartnersController.create
  )
  .get(
    validate(strategicSalePartnerValidation.show),
    strategicSalePartnersController.show
  );

// The rest of your routes...

router.route('/referral-shop').get(
  auth('all'), 
  // validate(strategicSalePartnerValidation.get),
  strategicSalePartnersController.getShopsByReferralKey
);
router
  .route('/:id')
  .get(
    auth('all'),
    validate(strategicSalePartnerValidation.get),
    strategicSalePartnersController.get
  )
  .patch(
    auth('all'),
    validate(strategicSalePartnerValidation.update),
    strategicSalePartnersController.update
  )
  .delete(
    auth('all'),
    validate(strategicSalePartnerValidation.get),
    strategicSalePartnersController.remove
  );

module.exports = router;
