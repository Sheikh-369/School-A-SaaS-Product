import { Request, Response } from "express";
import User from "../../../database/models/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import generateOTP from "../../../services/generateOTP";
import sendMail from "../../../services/sendMail";

const userRegister=async(req:Request,res:Response)=>{
    const {userName,userEmail,userPassword}=req.body
    if(!userName || !userEmail || !userPassword){
        res.status(400).json({
            message:"Please fill all the fields!"
        })
        return
    }

    const data=await User.findAll({
        where:{
            userEmail:userEmail
        }
    })
    if(data.length>0){
        res.status(404).json({
            message:"Email already registered!"
        })
    }
    await User.create({
        userName:userName,
        userEmail:userEmail,
        userPassword:bcrypt.hashSync(userPassword,12)
    })
    res.status(200).json({
        message:"User Registered Successfully!"
    })
}

const userLogin=async (req:Request,res:Response)=>{
    const {userEmail,userPassword}=req.body
    if(!userEmail || !userPassword){
        res.status(400).json({
            message:"Please provide Email and Password!"
        })
        return
    }

    const data=await User.findAll({
        where:{
            userEmail:userEmail
        }
    })

    if(data.length==0){
        res.status(404).json({
            message:"Email not registered!"
        })
    }else{
       const isPasswordMatch=bcrypt.compareSync(userPassword,data[0].userPassword)
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

const forgotPassword=async(req:Request,res:Response)=>{
    const {userEmail}=req.body
    //if the user does not sends email
    if(!userEmail){
        res.status(400).json({
            message:"Please provide Email!"
        })
        return
    }
    //finds the entered email
    const user=await User.findOne({
        where:{userEmail:userEmail}
    })

    //checks the eneterd email
    if(!user){
        res.status(400).json({
            message:"Email not Registered!"
        })
        return
    }
    //Sending OTP to registered Email
    const OTP=generateOTP()
    sendMail({
        to:userEmail,
        subject:"Password Restet Request",
        html:`<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; background: #fff; padding: 30px; border-radius: 6px; text-align: center;">
        <h2 style="color: #333;">Password Reset OTP</h2>
        <p style="color: #555;">Use the OTP below to reset your password:</p>
        <p style="font-size: 28px; font-weight: bold; color: #2d89ef; margin: 20px 0;">${OTP}</p>
        <p style="color: #999;">This code is valid for 10 minutes.</p>
    </div>`
    })
    //inserting data into user table
    user.OTP=OTP.toString()
    user.OTPGeneratedTime=new Date()
    user.OTPExpiry=new Date(Date.now() + 600_000)
    await user.save()

    res.status(200).json({
        message:"OTP is sent to this Email if registered!"
    })
}

export {userRegister,userLogin,forgotPassword}