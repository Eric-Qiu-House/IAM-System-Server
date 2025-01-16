const express = require('express');
const router = express.Router();

const login = require('./login/login');
const group = require('./org-group-route');
const relation = require('./org-relation-route');
const role = require('./org-role-route');
const user = require('./org-user-route');
const sysRoute = require('./system-route-route');
const versions = require('./sys-versions-route');
// const sysUserRoute = require('./system-user-route');

// const dept = require('./system/dept-route');
// const role = require('./system/role-route');
// const system = require('./system/system-route');
// const user = require('./system/user-route');

const defaultRoutes = [
  {
    path: '/login',
    route: login,
  },
  {
    path: '/group',
    route: group,
  },
  {
    path: '/relation',
    route: relation,
  },
  {
    path: '/role',
    route: role,
  },
  {
    path: '/user',
    route: user,
  },
  {
    path: '/sysRoute',
    route: sysRoute,
  },
  {
    path: '/versions',
    route: versions,
  },
  // {
  //   path: '/sysUserRoute',
  //   route: sysUserRoute,
  // }
];

// 拼接路由
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;