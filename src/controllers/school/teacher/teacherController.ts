//teacher CRUD operation(C-Create, R-Read, U-Update, D-Delete)

import { Response } from "express";
import IExtendedRequest from "../../../services/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";



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

    await sequelize.query(`INSERT INTO teacher_${schoolNumber}(teacherName,teacherPhoneNumber,teacherEmail,teacherAddress,teacherSalary) VALUES(?,?,?,?,?)`,{
        type:QueryTypes.INSERT,
        replacements:[teacherName,teacherPhoneNumber,teacherEmail,teacherAddress,teacherSalary]
    })
    res.status(200).json({
        message:"Teacher Created Successfully!",
        schoolNumber
    })

}

export default createTeacher