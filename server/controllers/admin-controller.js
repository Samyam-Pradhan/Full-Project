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
//single user logic
const getUserById = async(req,res) =>{
    try {
        const id = req.params.id.trim();
        const data = await User.findOne({_id : id});
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        
    }
}

// user update logic

const updateUserById = async() =>{
    try {
        const id = req.params.id;
        const UpdatedUserData = req.body;


        const updatedUser = await User.updateOne({_id:id},
            {
            $set: UpdatedUserData,
        }
    );
    return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        
    }
}

//delete user logic
const deleteUserById = async(req,res) =>{
    try {
        const id = req.params.id;
        await User.deleteOne({_id : id});
        return res.status(200).json({message: "User Deleted Sucessfully"})
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = { getAllUsers,deleteUserById, getUserById, updateUserById};
