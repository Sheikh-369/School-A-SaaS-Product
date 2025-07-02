import { Request, Response } from "express";
import sequelize from "../../database/connection";
import randomNumber from "../../services/randomNumberGenerator";
import { QueryTypes } from "sequelize";

const createSchool=async(req:Request,res:Response)=>{
    const {schoolName,schoolPhoneNumber,schoolEmail,schoolAddress}=req.body
    const schoolVatNumber=req.body.schoolVatNumber || null
    const schoolPanNumber=req.body.schoolPanNumber || null

    if(!schoolName || !schoolPhoneNumber || !schoolEmail || !schoolAddress){
        res.status(400).json({
            message:"Please fill all the fields!"
        })
        return
    }

    const schoolNumber=randomNumber()
    await sequelize.query(`CREATE TABLE IF NOT EXISTS school_${schoolNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        schoolName VARCHAR(255) NOT NULL,
        schoolPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
        schoolEmail VARCHAR(255) NOT NULL UNIQUE,
        schoolAddress VARCHAR(255) NOT NULL,
        schoolVatNumber VARCHAR(100),
        schoolPanNumber VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)

        await sequelize.query(`INSERT INTO school_${schoolNumber}(
           schoolName,schoolPhoneNumber,schoolEmail,schoolAddress,schoolVatNumber,schoolPanNumber ) VALUES(?,?,?,?,?,?)`,{
            type:QueryTypes.INSERT,
            replacements:[schoolName,schoolPhoneNumber,schoolEmail,schoolAddress,schoolVatNumber,schoolPanNumber]
           })

           res.status(200).json({
            message:"School Created Succesfully!",
            schoolNumber
           })
}

export default createSchool