import { Response } from "express";
import IExtendedRequest from "../../../services/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

const createStudent=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const {studentName,studentPhoneNumber,studentEmail,studentAddress}=req.body
    if(!studentName || !studentPhoneNumber || !studentEmail || !studentAddress){
        res.status(400).json({
            message:"Please fill all the fields!"
        })
        return
    }
    await sequelize.query(`INSERT INTO student_${schoolNumber}(studentName,studentPhoneNumber,studentEmail,studentAddress) VALUES(?,?,?,?)`,{
        type:QueryTypes.INSERT,
        replacements:[studentName,studentPhoneNumber,studentEmail,studentAddress]
    })
    res.status(200).json({
        message:"Student Created Successfully!",
        schoolNumber
    })
}

const fetchAllStudents=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const students=await sequelize.query(`SELECT * FROM student_${schoolNumber}`,{
        type:QueryTypes.SELECT
    })
    res.status(200).json({
        message:"All students Fetched Successfully!",
        data:students,
        schoolNumber
    })
}

const fetchSingleStudent=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const studentId=req.params.id
    const student=await sequelize.query(`SELECT * FROM student_${schoolNumber} WHERE id=?`,{
        type:QueryTypes.SELECT,
        replacements:[studentId]
    })
    res.status(200).json({
        message:"Single Student Fetched Successfully!",
        data:student,
        schoolNumber
    })
}

const deleteStudent=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const studentId=req.params.id
    await sequelize.query(`DELETE FROM student_${schoolNumber} WHERE id=?`,{
        type:QueryTypes.DELETE,
        replacements:[studentId]
    })
    res.status(200).json({
        message:"Student Deleted Successfully!",
        schoolNumber
    })
}


const updateStudent=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const studentId=req.params.id
    const {studentName,studentPhoneNumber,studentEmail,studentAddress}=req.body

    if(!studentName || !studentPhoneNumber || !studentEmail || !studentAddress){
        res.status(400).json({
            message:"Please fill all the fields!"
        })
        return
    }

    await sequelize.query(`UPDATE student_${schoolNumber} SET studentName=?,studentPhoneNumber=?,studentEmail=?,studentAddress=? WHERE id=?`,{
        type:QueryTypes.UPDATE,
        replacements:[studentName,studentPhoneNumber,studentEmail,studentAddress,studentId]
    })

    res.status(200).json({
        message:"Student Updated Successfully!",
        schoolNumber
    })

}

export {createStudent,fetchAllStudents,fetchSingleStudent,deleteStudent,updateStudent}