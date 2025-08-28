import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../database/models/userModel";
import IExtendedRequest from "../services/type";

export enum Role{
    SuperAdmin="super-admin",
    School="school",
    Teacher="teacher",
    Student="student"
}

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

const accessTo=(...roles:Role[])=>{
    return (req:IExtendedRequest,res:Response,next:NextFunction)=>{
        const userRole=req.user?.role as Role
        if(!roles.includes(userRole)){
            res.status(403).json({
                message:`As a ${userRole?? "Guess"}, you do not have access to this action.`
            })
            return
        }
        next()
    }
}

export {isLoggedIn,accessTo}