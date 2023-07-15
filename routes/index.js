const router = require('express').Router()
const authRoutes = require('./auth.routes')
const adminRoute = require('./admin.routes')

const defaultRoutes = [
    {
      path:'/auth',
      route:authRoutes
    },
    {
      path:'/admin',
      route:adminRoute
    }

  ];

    defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
    });
    
    module.exports = router;
  