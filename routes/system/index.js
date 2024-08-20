const express = require('express');
// const deptRoute = require('./dept.route.js');
// const roleRoute = require('./role.route.js');
const systemRoute = require('./system.route.js');
const userRoute = require('./user.route.js');

const router = express.Router();

const defaultRoutes = [
  // {
  //   path: '/depts',
  //   route: deptRoute,
  // },
  // {
  //   path: '/roles',
  //   route: roleRoute,
  // },
  {
    path: '/router',
    route: systemRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

// const devRoutes = [
  // 只在开发模式下可用
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
