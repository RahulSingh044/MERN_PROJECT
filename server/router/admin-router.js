const express = require('express');
const router = express.Router();
const adminController= require('../controller/admin-controller')
const authMiddleware = require('../middlewares/auth-middleware')

router.route('/users').get(authMiddleware, adminController.getAllUsers);
router.route('/user/:id').get(authMiddleware, adminController.getUserbyID);
router.route('/user/update/:id').patch(authMiddleware, adminController.updateUserbyID);
router.route('/users/delete/:id').delete(authMiddleware, adminController.deleteUser);
router.route('/contact').get(authMiddleware, adminController.getAllContact);
router.route('/contact/delete/:id').delete(authMiddleware, adminController.deleteContact);

module.exports = router;