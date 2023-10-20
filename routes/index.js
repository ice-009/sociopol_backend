const router = require('express').Router()
const authRoutes = require('./auth.routes')
const adminRoute = require('./admin.routes')
const dataRoute = require('./data.routes')
const chatRoute = require('./chat.routes')

const defaultRoutes = [
    {
      path:'/auth',
      route:authRoutes
    },
    {
      path:'/admin',
      route:adminRoute
    },
    {
      path:'/data',
      route:dataRoute
    },
    {
      path:'/chat',
      route:chatRoute
    }

  ];

    defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
    });
    
    module.exports = router;
  