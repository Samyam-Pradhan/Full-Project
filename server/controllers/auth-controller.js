const User = require("../models/user-models");
const bcrypt = require("bcryptjs");

const home = async(req, res) =>{
  try{
      res .status(200).send("Welcome to mern using router");
}catch(error){
      console.log(error);        
  }
}

const register =async(req,res) =>{
  try{
    /* console.log(req.body); */
    const {username , email, phone, password} = req.body;

    const userExist = await User.findOne({email:email})

    if(userExist){
      return res.status(400).json({message:"Email already exists"});
    }

    //hash the password
    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

     const userCreated = await User.create({username , email, phone, password:hash_password});
    
      res.status(200).json({message: "registration sucessfull", token: await userCreated.generateToken(), 
        userId: userCreated._id.toString(),
      });
  }catch(error){
      res.status(400).json({msg:"page not found"});
  }
}

// user login logic

const login = async (req, res) =>{
try {
  const {email, password} = req.body;

  const userExist = await User.findOne({email});

  if(!userExist){
    return res.status(400).json({message: "Invalid Credentials"});
  }

    const user = await bcrypt.compare(password, userExist.password);
/*     const user = await userExist.comparePassword(password); */

    if(user){
      res.status(200).json({message: "Login sucessfull", token: await userExist.generateToken(), 
        userId: userExist._id.toString(),
      });
    }
    else{
      res.status(401).json({msg:"Invalid email or password"});
    }

  }
 catch (error) {
  res.status(400).json({msg:"page not found"});
}
}
module.exports =  {home,register,login};