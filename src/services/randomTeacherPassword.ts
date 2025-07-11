import bcrypt from "bcrypt"
const randomTeacherPassword=(teacherName:string)=>{
    const randomNumber=Math.floor(1000+Math.random()*50000)
    const passwordData={
        hashedVersion:bcrypt.hashSync(`${randomNumber}_${teacherName}`,10),
        plainVersion:`${randomNumber}_${teacherName}`
    }
    return passwordData
}

export default randomTeacherPassword