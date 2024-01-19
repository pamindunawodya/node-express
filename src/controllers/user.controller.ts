//get all user
import express from "express";
import ArticleModel from "../models/article.model";
import {ObjectId} from "mongodb";
import customResponse from "../dtos/custom.response";
import UserModel from "../models/user.model";
import * as SchemaTypes from "../types/SchemaTypes";
import jwt, {Secret} from "jsonwebtoken";
import process from "node:process";
import bcrypt from "bcryptjs";

//middle wares controllers athulata gennh

//all users
export const getAllUser=async (req:express.Request, res:any)=>{
    // res.send("hello");

    // let data={
    //     name:"kamal",
    //     username:"Saman,",
    //     age:22,
    //     email:"kamal@ijse.com"
    //
    // }
    // res.send(data);

    //DB eke gson data tika json widiyta gnnaw
    try {
        let users=  await UserModel.find();
        res.status(200).send(
            new customResponse(200,"User are found Sucessfully",users)
        );
        //res.send(users);
    }catch (error){
        res.status(100).send("!Error");
    }

}


//create new user
export const newUser=async (req:express.Request,res:express.Response)=>{

    try {
        const  req_body:any=req.body;
        console.log(req_body);

        //encript password
        await bcrypt.hash(req_body.password,8,async function (err, hash) {
            if (err) {
                res.status(100).send(
                    new customResponse(200, "Something went wrong")
                )

            }
            const userModel = new UserModel({
                username: req_body.username,
                fname: req_body.fname,
                lname: req_body.lname,
                email: req_body.email,
                password:hash
            })
            // let user:Iuser|null=await  userModel.save();
            let user: SchemaTypes.Iuser | null = await userModel.save();


            if (user) {
                user.password = "";
                res.status(200).send(
                    new customResponse(200, "User Created Sucessfully", user)
                );
            }else {
                res.status(100).send(
                    new customResponse(200, "Something went wrong")
                )
            }
        })

        //db eken  value tika set krnwk



        // users.push(req_body)
    }catch (error){
        res.status(100).send("Error")
    }




    // res.send( "okay");
}

//auth
export const signUsers=async (req:express.Request,res:express.Response)=>  {



    let request_body=req.body
    //email , password

    let user:SchemaTypes.Iuser|null=await UserModel.findOne({email:request_body.email});
    if(user){

        //ecrypt krl tyn nisa dcryprt krnn wenw
       const isMatch=await bcrypt.compare(request_body.password,user.password)

        // if (user.password==request_body.password){
        if (isMatch){

            //0
            user.password="";

            const expiresIn='1w'

            jwt.sign({user},process.env.SECRET as Secret,{expiresIn},(err:any,token:any )=>{
                if(err){
                    res.status(100).send(
                        new customResponse(100,"Something Went Wrong")
                    );
                } else {

                    let  res_body={
                        user:user,
                        accessToken:token
                    }

                    res.status(200).send(
                        new customResponse(200,"Access",res_body)
                    );
                }
            })

        }else {
            //user innw password invalid
            res.status(401).send(
                new customResponse(401,"Invalid creditials")
            )
        }
    }else {
        res.status(404).send(
            new customResponse(404,"user not found")
        );

    }
}