import { Request, Response } from "express";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const teacherLogin=async(req:Request,res:Response)=>{
    const {teacherEmail,teacherPassword,schoolNumber}=req.body

    if(!teacherEmail || !teacherPassword || !schoolNumber){
        res.status(400).json({
            message:"Please fill all the fields!"
        })
        return
    }

    const result:any[]=await sequelize.query(`SELECT * FROM teacher_${schoolNumber} WHERE teacherEmail=?`,{
        type:QueryTypes.SELECT,
        replacements:[teacherEmail]
    })

    const teacher=result[0]

    if(!teacher){
        res.status(400).json({
            message:"Invalid Credentials!"
        })
        return
    }

    const isPasswordMatch=bcrypt.compareSync(teacherPassword,teacher.teacherPassword)

    if(!isPasswordMatch){
        res.status(400).json({
            message:"Invalid Credentials!"
        })
        return
    }

    const token=jwt.sign({teacherId:teacher.id},process.env.JWT_SECRET!,{expiresIn:"1d"})
    res.status(200).json({
        message:"Teacher Login Successful!",
        token,
        schoolNumber
    })
}

export default teacherLogin