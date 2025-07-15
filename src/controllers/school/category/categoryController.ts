import { Response } from "express";
import IExtendedRequest from "../../../services/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

const createCategory=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const {categoryName,categoryDescription}=req.body
    await sequelize.query(`INSERT INTO category_${schoolNumber}(categoryName,categoryDescription) VALUES(?,?)`,{
        type:QueryTypes.INSERT,
        replacements:[categoryName,categoryDescription]
    })
    res.status(200).json({
        message:"Category Created Successfully!",
        schoolNumber
    })
}

const updateCategory=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const categoryId=req.params.id
    const {categoryName,categoryDescription}=req.body
    await sequelize.query(`UPDATE category_${schoolNumber} SET categoryName=?,categoryDescription=? WHERE id=?`,{
        type:QueryTypes.UPDATE,
        replacements:[categoryName,categoryDescription,categoryId]
    })
    res.status(200).json({
        message:"Category Updated Successfully!",
        schoolNumber
    })
}

const fetchAllCategories=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const categories=await sequelize.query(`SELECT * FROM category_${schoolNumber}`,{
        type:QueryTypes.SELECT
    })
    res.status(200).json({
        message:"All Categories Fetched Successfully!",
        data:categories,
        schoolNumber
    })
}

const fetchSingleCategory=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const categoryId=req.params.id
    const category=await sequelize.query(`SELECT * FROM category_${schoolNumber} WHERE id=?`,{
        type:QueryTypes.SELECT,
        replacements:[categoryId]
    })
    res.status(200).json({
        message:"Single Category Fetched Successfully!",
        data:category,
        schoolNumber
    })
}

const deleteCategory=async(req:IExtendedRequest,res:Response)=>{
    const schoolNumber=req.user?.currentSchoolNumber
    const categoryId=req.params.id
    await sequelize.query(`DELETE FROM category_${schoolNumber} WHERE id=?`,{
        type:QueryTypes.DELETE,
        replacements:[categoryId]
    })
    res.status(200).json({
        message:"Category Deleted Successfully!",
        schoolNumber
    })
}

export {createCategory,updateCategory,fetchAllCategories,fetchSingleCategory,deleteCategory}