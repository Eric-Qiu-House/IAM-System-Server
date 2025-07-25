const Model = require('../models/sys-router_mod'); // 引入模型
const { Op } = require('sequelize');

// function
// 递归函数将数据转换为树状结构
const buildTree = (data, parentId = null, userRole) => {
  return data
    .filter(item => item.parent_id === parentId && (!item.permissions || item.permissions.split(',').includes(userRole)))
    .map(item => ({
      id: item.id,
      name: item.name,
      path: item.path,
      meta: {
        icon: item.icon,
        title: item.title,
        role: item.permissions ? item.permissions.split(',') : [],
        type: item.type,
        hidden: item.hidden,
        parent_id: item.parent_id,
      },
      component: item.component,
      children: buildTree(data, item.id, userRole)
    }));
};

// 添加
async function createService(info) {
  try {
    const data = await Model.create(info);
    return data;
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}

// 修改路由信息
async function updateService(req) {
  try {
    const route = await Model.findByPk(req.id);

    if (!route) {
      return new Error('路由未找到');
    }

    const updatedRoute = await route.update(req);
    return updatedRoute;
  } catch (error) {
    console.error('更新路由时出错:', error);
    throw error;
  }
}

// 获取所有路由数据并构建树状结构
async function readService() {
  try {
    const routes = await Model.findAll({ raw: true });
    const routesTree = buildTree(routes);
    return routesTree;
  } catch (error) {
    console.error('Error fetching routes:', error);
  }
};

// 通过路由id，遍历路由树
async function readByRouteIdsService(routerIds) {
  try {
    // 对 routerIds 进行去重操作
    const uniqueRouterIds = [...new Set(routerIds)];

    // 查询路由记录
    const routes = await Model.findAll({
      where: {
        id: {
          [Op.in]: uniqueRouterIds, // 使用Op.in来匹配去重后的routerIds数组
        }
      },
    });

    if (routes.length > 0) {
      // 构建路由树
      const routesTree = buildTree(routes);
      return routesTree;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error finding router trees by router IDs:', error);
    throw error;
  }
}

module.exports = {
  createService,
  updateService,
  readService,
  readByRouteIdsService
}
