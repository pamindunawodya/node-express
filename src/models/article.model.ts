import mongoose, {ObjectId} from "mongoose";
import * as SchemaTypes from "../types/SchemaTypes";



// interface IArticle extends mongoose.Document{
//     title:string,
//
//     description:string,
//
//     publishdate:Date,
//
//     user:ObjectId
// }

const ArticleSchema=new mongoose.Schema<SchemaTypes.IArticle>({
    title:{type:String,required:true},
    description:{type:String,required:true},
    publishdate:{type:Date,required:true,default:Date.now()},
    //wena document ekk id ekk dnwnm mehem dnn one
    user:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'user'}
})

const ArticleModel=mongoose.model('Article',ArticleSchema);
export default ArticleModel;