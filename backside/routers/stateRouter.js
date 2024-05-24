const express = require('express');
const router = express.Router();
const statsctrl = require('../controllers/statsCtrl');
const auth = require('../middlewares/auth');

router.get('/stats',auth, statsctrl.getUserStats);

module.exports = router;