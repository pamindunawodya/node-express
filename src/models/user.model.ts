import {Document,Schema,model} from "mongoose";
import * as SchemaTypes from "../types/SchemaTypes";


//userSchema ek type safe karanna tm me interface ek gnne
//  interface Iuser extends Document{
//     username:string,
//     fname:string,
//     lname:string,
//     email:string,
//     password:string
//
//
// }
const userSchema=new Schema<SchemaTypes.Iuser>({
    username:{type:String,required:true},
    fname:{type:String,required: true},
    lname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

//collection eke name e denne "user"
const UserModel=model("user",userSchema);



export default UserModel;
