// const express=require('express');  --es5 wala awe

import dotenv from 'dotenv';
dotenv.config();

//import express
import express from 'express';

//import body parser
import bodyParser from "body-parser";

//import mongoose
import mongoose ,{Schema}from "mongoose";

//import user.model
 import UserModel from "./models/user.model";

//jwt
import jwt, {Secret} from 'jsonwebtoken';

import * as process from "node:process";

//connect mongoDB
mongoose.connect(process.env.MONGO_URL as string)

//import customResponse
import customResponse from "./dtos/custom.response";

 import ArticleModel from "./models/article.model";

import {ObjectId} from "mongodb";

//routers wala export krpu router ek import krnw
import UserRoutes from "../src/Routes/user.routes"
import ArticleRoutes from "../src/Routes/article.routes"





//get connection
const db=mongoose.connection

db.on('error',(error)=>{
    console.log("DB Connection Error",error)
})

db.on('open',()=>{
    console.log("DB Connected Sucessfully")
})


//----------------------------user routes----------------------------
// interface User{
//     username:string;
//     fname:string;
//     lname:string
//     email:string
//     password:string
//
// }


//invoke express
const app=express();

//request eke body ekk enwnm json walin pennanna | down comment type script ignore
//@ts-ignore
app.use(bodyParser.json());



// const users:User[]=[];

// const verifyToken=(req:express.Request,res:any,next:express.NextFunction)=>{
//
//     const token= req.headers.authorization;
//
//     //verify token
//     if(!token){
//         return res.status(401).json('Invalid Token ')
//     } try {
//         const data=jwt.verify(token,process.env.SECRET as Secret);
//         res.tokenData=data;
//         next();
//     }catch (error){
//         return  res.status(401).json('Invalid Token')
//     }
// }



// //all users get back end
// app.get('/user/all',verifyToken,async (req:express.Request,res:any)=>{
//     // res.send("hello");
//
//     // let data={
//     //     name:"kamal",
//     //     username:"Saman,",
//     //     age:22,
//     //     email:"kamal@ijse.com"
//     //
//     // }
//     // res.send(data);
//
//     //DB eke gson data tika json widiyta gnnaw
//     try {
//         let users=  await UserModel.find();
//         res.status(200).send(
//             new customResponse(200,"User are found Sucessfully",users)
//         );
//         //res.send(users);
//     }catch (error){
//         res.status(100).send("!Error");
//     }
//
// })

//userge header ekt user kall methanin add kragnne


//
// //time ek yana nisa asynchoronous kala function eka
// app.post('/users',async (req:express.Request,res:express.Response)=>{
//
//     try {
//         const  req_body:any=req.body;
//         console.log(req_body);
//
//     //db eken  value tika set krnwk
//
//         const userModel=new UserModel({
//             username:req_body.username,
//             fname:req_body.fname,
//             lname:req_body.lname,
//             email:req_body.email,
//             password:req_body.password
//         })
//          // let user:Iuser|null=await  userModel.save();
//           let user:SchemaTypes.Iuser|null=await  userModel.save();
//
//
//         if(user){
//             user.password="";
//             res.status(200).send(
//                 new customResponse(200,"User Created Sucessfully",user)
//             );
//         }
//
//         // users.push(req_body)
//     }catch (error){
//         res.status(100).send("Error")
//     }
//
//
//
//
//     // res.send( "okay");
// })
//
//
//
// app.post('/auth',async (req:express.Request,res:express.Response)=>  {
//
//
//
//     let request_body=req.body
//     //email , password
//
//     let user:SchemaTypes.Iuser|null=await UserModel.findOne({email:request_body.email});
//     if(user){
//         if (user.password==request_body.password){
//
//             //0
//             user.password="";
//
//             const expiresIn='1w'
//
//             jwt.sign({user},process.env.SECRET as Secret,{expiresIn},(err:any,token:any )=>{
//                if(err){
//                    res.status(100).send(
//                        new customResponse(100,"Something Went Wrong")
//                    );
//                } else {
//
//                    let  res_body={
//                        user:user,
//                        accessToken:token
//                    }
//
//               res.status(200).send(
//                        new customResponse(200,"Access",res_body)
//                    );
//                }
//             })
//
//         }else {
//             //user innw password invalid
//         res.status(401).send(
//             new customResponse(401,"Invalid creditials")
//         )
//         }
//     }else {
//         res.status(404).send(
//             new customResponse(404,"user not found")
//         );
//
//     }
// })
//

app.use('/user', UserRoutes);

//-----------------------------article routes---------------------------------


app.use('/article', ArticleRoutes);


//
// app.post('/article',async (req:express.Request,res:express.Response)=>{
//     try {
//
//         let req_body=req.body;
//
//         console.log(req_body);
//
//        const articleModel= new ArticleModel({
//             title:req_body.title,
//             description:req_body.description,
//             user:new ObjectId(req_body.user)
//         });
//
//         await articleModel.save().then(r=> {
//             res.status(200).send(
//                 new customResponse(200,"Article Created Sucessfully")
//             )
//
//         }).catch(e=>{
//             res.status(100).send(
//                 new customResponse(100,"Something Went Wrong")
//             )
//             console.log(e);
//
//         });
//
//
//
//     }catch (error){
//         res.status(401).send("error");
//     }
//
// })
//
//
// app.get('/articles',async (req:express.Request,res:express.Response)=> {
//
//     try {
//
//         let req_query:any=req.query;
//         let size:number=req_query.size;
//         let page:number=req_query.page;
//
//
//
//         //size 10 page 1 nam val:(db eke collection wala tiyana 1*10 =10 palaweni 10 ain karl ithuru tike 1 weni 10 gnnw)
//         //const articles = await ArticleModel.find().limit(req.query.size).skip(req.query.size*req.page);
//         //error resolving
//         const articles = await ArticleModel.find().limit(size).skip(size*(page-1));
//
//
//         let documentCount=await ArticleModel.countDocuments();
//         let pageCount=Math.ceil(documentCount/size);
//
//
//         res.status(200).send(
//             new customResponse(200, "Articles Are Found Sucessfully", articles,pageCount)
//         );
//
//     }catch (error){
//         res.status(100).send("Error")
//     }
//
// })
//
//
// app.get('/article/:username',async (req:express.Request,res:express.Response)=>{
//
//     try {
//
//         let req_query:any=req.query;
//         let size:number=req_query.size;
//         let page:number=req_query.page;
//
//
//         // console.log(req.params.username);
//
//         let username:string=req.params.username;
//
//         let user= await UserModel.findOne({username:username});
//
//         //user kenek nttm
//         if (!user){
//             res.status(404).send(
//               new  customResponse(404,"user are not found")
//             )
//         }else {
//             let articles=await ArticleModel.find({user:user._id}).limit(size).skip(size*(page-1));
//
//              let documentCount=await ArticleModel.countDocuments({user:user._id});
//              let pageCount=Math.ceil(documentCount/size);
//
//
//             res.status(200).send(
//                 new customResponse(200,"Articles Are Found Sucessfully",articles,pageCount)
//             )
//         }
//     }catch (error){
//         res.status(100).send("Error")
//     }
// })
//
//
// //token find user get data
//
// app.get('/article/get/my',verifyToken,async (req:express.Request,res:any)=>{
//
//     try {
//
//         let req_query:any=req.query;
//         let size:number=req_query.size;
//         let page:number=req_query.page;
//
//
//         let user_id=res.tokenData.user._id;
//
//         let articles=await ArticleModel.find({user:user_id}).limit(size).skip(size*(page-1));
//
//         let documentCount=await ArticleModel.countDocuments({user:user_id});
//
//         let pageCount=Math.ceil(documentCount/size);
//
//         res.status(200).send(
//             new customResponse(200,'Articles Are Found Sucessfully',articles,pageCount)
//         )
//
//
//
//     }catch (error){
//         res.status(100).send("Not Found")
//     }
//
// })
//
//
// //update article
//
// app.put('/article',verifyToken,async (req:express.Request,res:any)=>{
//
//
//     try{
//
//         //check article by user
//
//         let req_body:any=req.body
//         let user_id=res.tokenData.user._id;
//         let article=  await ArticleModel.find({_id:req_body.id,user:user_id})
//
//         console.log('test');
//
//         if (article){
//
//             await ArticleModel.findByIdAndUpdate({_id:req_body.id},{
//                 title:req_body.title,
//                 description:req_body.description
//             }).then(r=>{
//                 res.status(200).send(
//                     new customResponse(200,"Article Updated Sucessfully")
//                 )
//             }).catch(e=>{
//                 console.log(e);
//                 res.status(100).send(
//                     new customResponse(100,"Something went Wrong")
//                 )
//             })
//
//         }else {
//             res.status(401).send(
//                 new customResponse(401,"Access Denied")
//             )
//         }
//
//
//     }catch (error){
//         res.status(100).send(error);
//     }
// })
//
//
// app.delete('/article/:id',verifyToken,async (req:express.Request,res:any)=>{
//     console.log('tttette')
//
//     try{
//
//         let articleID:string=req.params.id;
//         let user_id=res.tokenData.user._id;
//         let article=  await ArticleModel.find({_id:articleID,user:user_id})
//
//     if (article){
//
//         await ArticleModel.deleteOne({_id:articleID,user:user_id}).then(r=>{
//
//             res.status(200).send(
//                 new customResponse(200,"Article Deleted Sucessfully")
//             )
//         }).catch(e=>{
//             console.log(e);
//             res.status(100).send(
//                 new customResponse(100,"Something went Wrong")
//             )
//         })
//
//
//     }else {
//         res.status(401).send(
//         new customResponse(401,"access denied")
//     )}
//
//
//     }catch (error){
//         res.status(100).send(error);
//     }
//
//
// })


//start the server
app.listen(8080,()=>{
    console.log("Server started 8080")
})