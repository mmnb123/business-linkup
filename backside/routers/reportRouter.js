const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const reportCtrl = require('../controllers/reportCtrl');

router.post('/report', auth, reportCtrl.reportPost);

module.exports = router;