import { Request } from "express";

interface IExtendedRequest extends Request{
    user?:{
        id:string,
        currentSchoolNumber:string | number,
        role:string
    }
    schoolNumber?:string | number
}

export default IExtendedRequest