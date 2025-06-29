import { Request, Response } from "express";
import User from "../../../database/models/userModel";
import bcrypt from "bcrypt"

const userRegister=async(req:Request,res:Response)=>{
    const {userName,email,password}=req.body
    if(!userName || !email || !password){
        res.status(400).json({
            message:"Please fill all the fields!"
        })
        return
    }

    await User.create({
        userName:userName,
        email:email,
        password:bcrypt.hashSync(password,12)
    })
    res.status(200).json({
        message:"User Registered Successfully!"
    })
}

export default userRegister