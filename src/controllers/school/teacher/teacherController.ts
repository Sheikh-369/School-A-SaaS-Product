//teacher CRUD operation(C-Create, R-Read, U-Update, D-Delete)

import { Response } from "express";
import IExtendedRequest from "../../../services/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import randomTeacherPassword from "../../../services/randomTeacherPassword";
import sendMail from "../../../services/sendMail";
import User from "../../../database/models/userModel";



const createTeacher=async(req:IExtendedRequest,res:Response)=>{

    const schoolNumber=req.user?.currentSchoolNumber //schoolNumber taneko

    const {teacherName,teacherPhoneNumber,teacherEmail,teacherAddress,teacherSalary}=req.body

    //form varda line data yadi kunai birsiyo bhane
    if(!teacherName || !teacherPhoneNumber || !teacherEmail || !teacherAddress || !teacherSalary){
        res.status(400).json({
            message:"Please fill all the fields!"
        })
        return
    }
    //comparing teacher email with user email
    const existingUser=await User.findAll({
        where:{userEmail:teacherEmail}
    })

    const data=randomTeacherPassword(teacherName)

    if(existingUser.length===0){
        await User.create({
            userName:teacherName,
            userEmail:teacherEmail,
            userPassword:data.hashedVersion,
            role:"teacher",
            currentSchoolNumber:schoolNumber
        })
    }

    await sequelize.query(`INSERT INTO teacher_${schoolNumber}(teacherName,teacherPhoneNumber,teacherEmail,teacherAddress,teacherSalary,teacherPassword) VALUES(?,?,?,?,?,?)`,{
        type:QueryTypes.INSERT,
        replacements:[teacherName,teacherPhoneNumber,teacherEmail,teacherAddress,teacherSalary,data.hashedVersion]
    })

    //sending  mail to teacher
    const mailInformation={
        to:teacherEmail,
        subject:"You are Welcome to our School.",
        html:`<!DOCTYPE html>
                <html>
                <head>
                    <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f7fa;
                        padding: 20px;
                        margin: 0;
                    }
                    .container {
                        max-width: 600px;
                        background-color: #ffffff;
                        margin: auto;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.05);
                    }
                    h2 {
                        color: #004aad;
                    }
                    .info {
                        background-color: #f0f4ff;
                        padding: 15px;
                        border-radius: 8px;
                        margin-top: 20px;
                        font-size: 16px;
                    }
                    .info p {
                        margin: 10px 0;
                    }
                    </style>
                </head>
                <body>
                    <div class="container">
                    <h2>Welcome, ${teacherName}!</h2>
                    <p>Below are your account details to access the school system:</p>
                    <div class="info">
                        <p><strong>School Number:</strong> ${schoolNumber}</p>
                        <p><strong>Password:</strong> ${data.plainVersion}</p>
                    </div>
                    <p>Please keep this information confidential. You may be prompted to change your password after your first login.</p>
                    </div>
                </body>
                </html>`
    }

    await sendMail(mailInformation)


    res.status(200).json({
        message:"Teacher Created Successfully!",
        schoolNumber
    })

}


const fetchAllTeacher=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const teachers=await sequelize.query(`SELECT * FROM teacher_${schoolNumber}`,{
        type:QueryTypes.SELECT
    })
    res.status(200).json({
        message:"All teachers fetched Successfully!",
        data:teachers,
        schoolNumber
    })
}

const fetchSingleTeacher=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const teacherId=req.params.id
    const teacher=await sequelize.query(`SELECT * FROM teacher_${schoolNumber} WHERE id=?`,{
        type:QueryTypes.SELECT,
        replacements:[teacherId]
    })
    res.status(200).json({
        message:"Single Teacher Fetched Successfully!",
        data:teacher,
        schoolNumber
    })
}

const deleteTeacher=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const teacherId=req.params.id
    await sequelize.query(`DELETE FROM teacher_${schoolNumber} WHERE id=?`,{
        type:QueryTypes.DELETE,
        replacements:[teacherId]
    })
    res.status(200).json({
        message:"Teacher Deleted Successfully!"
    })
}

const updateTeacher=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const teacherId=req.params.id
    const {teacherName,teacherPhoneNumber,teacherEmail,teacherAddress,teacherSalary}=req.body

    if(!teacherName || !teacherPhoneNumber || !teacherEmail || !teacherAddress || !teacherSalary){
        res.status(400).json({
            message:"Please fill all the fields!"
        })
        return
    }

    await sequelize.query(`UPDATE teacher_${schoolNumber} SET teacherName=?, teacherPhoneNumber=?,teacherEmail=?,teacherAddress=?,teacherSalary=? WHERE id=?`,{
        type:QueryTypes.UPDATE,
        replacements:[teacherName,teacherPhoneNumber,teacherEmail,teacherAddress,teacherSalary,teacherId]
    })
    res.status(200).json({
        message:"Teacher Updated Successfully!",
        schoolNumber
    })
}

export {createTeacher,fetchAllTeacher,fetchSingleTeacher,deleteTeacher,updateTeacher}