const bcrypt = require("bcryptjs");
const User = require("../models/user-models");

const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;  // The user data is already set by the authMiddleware

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ msg: "New password is required" });
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password in the database
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ msg: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { getCurrentUser, changePassword };
