const express = require('express');
const router = express.Router();
const groupRoute = require('./group-route');
const relationRoute = require('./relation-route');
const roleRoute = require('./role-route');
const userRoute = require('./user-route');

const defaultRoutes = [
  {
    path: '/group',
    route: groupRoute,
  },
  {
    path: '/relation',
    route: relationRoute,
  },
  {
    path: '/role',
    route: roleRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
];

// 拼接路由
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
