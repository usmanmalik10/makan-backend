const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const ServiceValidation = require('../../validations/serviceProvider.validation');
const serviceController = require('../../controllers/serviceProvider.controller');
const { serviceImage } = require("../../ImageUploader/serviceImage");


var bodyParser = require('body-parser');
var app = express();

const router = express.Router();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router
  .route('/')
  .post(
    auth('all'),
    serviceImage,
    urlencodedParser,
    validate(ServiceValidation.create),
    serviceController.updateService
  )
  .get(validate(ServiceValidation.show), serviceController.show);

router.get(
  '/userId',
  auth('all'),
  validate(ServiceValidation.show),
  serviceController.getByUserId
);

router
  .route('/:serviceId')
  .get(validate(ServiceValidation.get), serviceController.get)
  .patch(
    auth('all'),
    validate(ServiceValidation.update),
    serviceController.update
  )
  .delete(
    auth('all'),
    validate(ServiceValidation.get),
    serviceController.remove
  );

module.exports = router;
