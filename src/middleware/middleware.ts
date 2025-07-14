import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../database/models/userModel";
import IExtendedRequest from "../services/type";

const isLoggedIn=async(req:IExtendedRequest,res:Response,next:NextFunction)=>{
    const token=req.headers.authorization
    if(!token){
        res.status(400).json({
            message:"Please provide token!"
        })
        return
    }
    jwt.verify(token,process.env.JWT_SECRET!,async(error,success:any)=>{
        if(error){
            res.status(404).json({
                message:"Invalid Token!"
            })
        }else{
            const userData=await User.findByPk(success.id)
            if(!userData){
                res.status(404).json({
                    message:"User does not exists!"
                })
            }else{
                req.user=userData
                next()
            }
        }
    })
            
}

export default isLoggedIn