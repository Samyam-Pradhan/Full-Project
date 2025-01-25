const adminMiddleware = async (req, res, next) =>{
    try {
        console.log(req.user);
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res
            .status(403)
            .json({message: "Access denied. User is not an admin"});
        }
        //if user is admin proceed to the next middleware
        next();
       /*  res.status(200).json({msg : req.user.isAdmin}) */
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = adminMiddleware;