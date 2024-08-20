const Route = require('../../models/system/router_mod'); // 引入模型

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

// 获取所有路由数据并构建树状结构
async function getRoutesTree() {
    try {
        const routes = await Route.findAll({ raw: true });
        const routesTree = buildTree(routes);
        return routesTree;
    } catch (error) {
        console.error('Error fetching routes:', error);
    }
};

// 修改路由信息
async function updateRoute(req) {
  try {
    const route = await Route.findByPk(req.id);

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
// 添加路由信息
  // 插入部门
  async function addRouter(info) {
    try {
      const data = await Route.create(info);
      return data;
    } catch (error) {
      console.error('Error finding users:', error);
      throw error;
    }
  }

module.exports = {
    getRoutesTree,
    updateRoute,
    addRouter
}
