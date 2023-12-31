const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routers');
const dashboardRoutes = require('./dashboard-routers');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);


module.exports=router;
