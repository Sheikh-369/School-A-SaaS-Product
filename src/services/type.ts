import { Request } from "express";

interface IExtendedRequest extends Request{
    user?:{
        id:string,
        currentSchoolNumber:string | number
    }
    schoolNumber?:string | number
}

export default IExtendedRequest