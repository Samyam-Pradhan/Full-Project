const express = require("express");
const adminController = require("../controllers/admin-controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router.route('/users').get(authMiddleware, adminMiddleware, adminController.getAllUsers);

module.exports = router;