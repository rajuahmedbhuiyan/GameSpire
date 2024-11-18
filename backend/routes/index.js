const router = require('express').Router();
const authRoutes = require('./auth');
const chatRoutes = require('./chatRoutes');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/chat', chatRoutes);


module.exports = router;