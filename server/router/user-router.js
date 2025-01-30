const express = require("express");
const { getCurrentUser, changePassword } = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

// Route to get the logged-in user's data
router.route('/user').get(authMiddleware, getCurrentUser);

// Route to change the password of a user
router.route('/user/update/:id').patch(authMiddleware, changePassword);

module.exports = router;
