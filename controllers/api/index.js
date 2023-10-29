const router = require('express').Router();

const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const commentsRoutes = require('./commentsRoutes');

router.use('/users', userRoutes);
router.use('/blogPostRoutes', blogPostRoutes);
router.use('/commentsRoutes', commentsRoutes);



module.exports = router;