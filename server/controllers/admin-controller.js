const User = require("../models/user-models");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, {password: 0});
        console.log(users);

        if (!users || users.length === 0) {
            return res.status(404).json({ msg: "No users found" });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = getAllUsers;
