const express = require('express');
const adminCtrl = require('../controllers/adminCtrl');
const authAdmin = require('../middlewares/authAdmin');

const router = express.Router();

router.post('/alogin', adminCtrl.adminLogin);
router.get('/users', authAdmin, adminCtrl.getAllUsers);
router.delete('/users/:id', authAdmin, adminCtrl.deleteUser);
router.get('/reports', authAdmin, adminCtrl.getAllReports);
router.get('/posts/:id',authAdmin,adminCtrl.Post);
router.delete('/posts/:id', authAdmin, adminCtrl.deletePost);

module.exports = router;

