const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require("../model/User.model");


const userRouter = express.Router();


userRouter.post("/register"  ,async(req,res)=>{
    const {name , email , password} = req.body;
    try {
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            res.send("User is already registerd!!")
        }
         const hashedPassword = await bcrypt.hash(password , 10);

         const user = new UserModel({email  , name , password:hashedPassword});

         await user.save();

         const token = jwt.sign({email : user.email , id:user._id} , "kanban");
         res.send({"msg" : "user registered" , "token" : token})
        
    } catch (error) {
        res.send(error)
    }
})

userRouter.post("/login"  ,async(req,res)=>{
    const { email , password} = req.body;
    try {
        const existingUser = await UserModel.findOne({email});
        if(!existingUser){
            res.send("user not found");
        }
         const rehashedPassword = await bcrypt.compare(password , existingUser.password);
         if(!rehashedPassword){
            res.send("Invalid Credentials!!")
         }

         const token = jwt.sign({email : existingUser.email , id:existingUser._id} , "kanban");
         res.send({"msg" : "successfully logged in" , "token" : token})
        
    } catch (error) {
        res.send(error)
    }
})


module.exports ={
    userRouter
}