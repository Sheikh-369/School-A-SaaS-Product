import { Request, Response } from "express";
import User from "../../../database/models/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

const userLogin=async (req:Request,res:Response)=>{
    const {email,password}=req.body
    if(!email || !password){
        res.status(400).json({
            message:"Please provide Email and Password!"
        })
        return
    }

    const data=await User.findAll({
        where:{
            email:email
        }
    })

    if(data.length==0){
        res.status(404).json({
            message:"Email not registered!"
        })
    }else{
       const isPasswordMatch=bcrypt.compareSync(password,data[0].password)
       if(isPasswordMatch){
        const token=jwt.sign({id:data[0].id},process.env.JWT_SECRET!,{
            expiresIn:"30d"
        })
        res.status(200).json({
            message:"Login Successful!",
            token:token
        })
       }else{
        res.status(404).json({
            message:"Invalid Email or Password!"
        })
       } 
    }

}

export {userRegister,userLogin}