import { Table,Column,Model,DataType } from "sequelize-typescript";

@Table({
    tableName:"users",
    modelName:"User",
    timestamps:true
})

class User extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:string

    @Column({
        
        type:DataType.STRING
    })
    declare userName:string

    @Column({
        type:DataType.STRING,
        unique:true
    })
    declare userEmail:string

    @Column({
        type:DataType.STRING
    })
    declare userPassword:string

    @Column({
        type:DataType.ENUM("student","teacher","school","super-admin"),
        defaultValue:"student"
    })
    declare role:string

    @Column({
        type:DataType.STRING
    })
    declare currentSchoolNumber:string

    @Column({
        type:DataType.STRING
    })
    declare OTP:string | null

    @Column({
        type:DataType.DATE
    })
    declare OTPGeneratedTime:Date | null | string

    @Column({
        type:DataType.DATE
    })
    declare OTPExpiry:Date | null | string
}

export default User