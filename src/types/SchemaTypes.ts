
import mongoose, {Document, ObjectId} from "mongoose";


export interface IArticle extends mongoose.Document{
    title:string,

    description:string,

    publishdate:Date,

    user:ObjectId
}

export interface Iuser extends Document{
    username:string,
    fname:string,
    lname:string,
    email:string,
    password:string


}

