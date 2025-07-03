import { Request, Response } from "express";
import sequelize from "../../database/connection";
import randomNumber from "../../services/randomNumberGenerator";
import { QueryTypes } from "sequelize";
import User from "../../database/models/userModel";
import IExtendedRequest from "../../services/type";

const createSchool=async(req:IExtendedRequest,res:Response)=>{
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

           await sequelize.query(`CREATE TABLE IF NOT EXISTS user_school(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            userId VARCHAR(225) REFERENCES user(id),
            schoolNumber INT UNIQUE
            )`)

            if(req.user){
                await sequelize.query(`INSERT INTO user_school(
                    userId,schoolNumber) VALUES(?,?)`,{
                        type:QueryTypes.INSERT,
                        replacements:[req.user.id,schoolNumber]
                    })
                    await User.update({
                        currentSchoolNumber:schoolNumber,
                        role:"school"
                    },{
                        where:{
                            id:req.user.id
                        }
                    })
            }

            if(req.user){
                req.user.currentSchoolNumber=schoolNumber
            }

           res.status(200).json({
            message:"School Created Succesfully!",
            schoolNumber
           })
}

export default createSchool