const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const serviceRoute = require('./serviceProvider.route');
const estateRoute = require('./realEstate.route');
const shopRoute = require('./shop.route');
const strategicRoute = require('./strategicSalePartners.route');
const dailyRates = require('./dailyRates.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/service',
    route: serviceRoute,
  },
  {
    path: '/real-estate',
    route: estateRoute,
  },
  {
    path: '/shop',
    route: shopRoute,
  },
  {
    path: '/strategic-sale-partners',
    route: strategicRoute,
  },
  {
    path: '/daily-rates',
    route: dailyRates,
  },
];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
