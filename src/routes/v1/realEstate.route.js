const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const realEstateValidation = require("../../validations/realEstate.validation");
const realEstateController = require("../../controllers/realEstate.controller");

const router = express.Router();
router
  .route("/")
  .post(
    auth("all"),
    validate(realEstateValidation.create),
    realEstateController.create
  )
  .get(
    validate(realEstateValidation.show),
    realEstateController.show
  );

router.get(
  "/userId",
  auth("all"),
  validate(realEstateValidation.show),
  realEstateController.show
);

router
  .route("/:id")
  .get(
    validate(realEstateValidation.get),
    realEstateController.get
  )
  .patch(
    auth("all"),
    validate(realEstateValidation.update),
    realEstateController.update
  )
  .delete(
    auth("all"),
    validate(realEstateValidation.get),
    realEstateController.remove
  );

module.exports = router;
