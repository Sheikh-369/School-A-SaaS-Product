import { Response } from "express";
import IExtendedRequest from "../../../services/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

const createCourse=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const {courseName,courseFee,courseDescription,teacherId,categoryId}=req.body

    //for files
    const courseThumbnail=req.file?req.file.path:null

    if(!courseName || !courseFee || !courseDescription){
        res.status(400).json({
            message:"Please fill all the fields!"
        })
        return
    }

    await sequelize.query(`INSERT INTO course_${schoolNumber} (courseName,courseFee,courseDescription,courseThumbnail,teacherId,categoryId) VALUES(?,?,?,?,?,?)`,{
        type:QueryTypes.INSERT,
        replacements:[courseName,courseFee,courseDescription,courseThumbnail,teacherId || null,categoryId || null]
    })
    res.status(200).json({
        message:"Course Created Successfully!",
        schoolNumber
    })
}

const fetchAllCourses=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const courses=await sequelize.query(`SELECT * FROM course_${schoolNumber} JOIN category_${schoolNumber} ON course_${schoolNumber}.categoryId=category_${schoolNumber}.id`,{
        type:QueryTypes.SELECT
    })
    res.status(200).json({
        message:"All Courses Fetched Successfully!",
        data:courses
    })
}

const fetchSingleCourse=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const courseId=req.params.id
    const course=await sequelize.query(`SELECT * FROM course_${schoolNumber} WHERE id=?`,{
        type:QueryTypes.SELECT,
        replacements:[courseId]
    })
    res.status(200).json({
        message:"Single Course Fetched Successfully!",
        data:course,
        schoolNumber
    })
}

const deleteCourse=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const courseId=req.params.id
    await sequelize.query(`DELETE FROM course_${schoolNumber} WHERE id=?`,{
        type:QueryTypes.DELETE,
        replacements:[courseId]
    })
    res.status(200).json({
        message:"Course Deleted Successfully!",
        schoolNumber
    })
}

const updateCourse=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const courseId=req.params.id
    const {courseName,courseFee,courseDescription,teacherId,categoryId}=req.body

    const courseThumbnail=req.file?req.file.path:null 

    if(!courseName || !courseFee || !courseDescription){
        res.status(400).json({
            message:"Please fill all the fields!"
        })
        return
    }

    await sequelize.query(`UPDATE course_${schoolNumber} SET courseName=?,courseFee=?,courseDescription=?, courseThumbnail=?,teacherId=?,categoryId WHERE id=?`,{
        type:QueryTypes.UPDATE,
        replacements:[courseName,courseFee,courseDescription,courseThumbnail || null,teacherId || null,categoryId || null,courseId]
    })
    res.status(200).json({
        message:"Course Updated Successfully!",
        schoolNumber
    })
}

export {createCourse,fetchAllCourses,fetchSingleCourse,deleteCourse,updateCourse}