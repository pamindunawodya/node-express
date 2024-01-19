
//all users get back end
import express from "express";
import UserModel from "../models/user.model";
import customResponse from "../dtos/custom.response";
import * as SchemaTypes from "../types/SchemaTypes";
import jwt, {Secret} from "jsonwebtoken";
import process from "node:process";

//userwa route krnn express wala router manage object ek use krnw
const router=express.Router();



router.get('/all',async (req:express.Request, res:any)=>{
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

})

//time ek yana nisa asynchoronous kala function eka
router.post('/',async (req:express.Request,res:express.Response)=>{

    try {
        const  req_body:any=req.body;
        console.log(req_body);

        //db eken  value tika set krnwk

        const userModel=new UserModel({
            username:req_body.username,
            fname:req_body.fname,
            lname:req_body.lname,
            email:req_body.email,
            password:req_body.password
        })
        // let user:Iuser|null=await  userModel.save();
        let user:SchemaTypes.Iuser|null=await  userModel.save();


        if(user){
            user.password="";
            res.status(200).send(
                new customResponse(200,"User Created Sucessfully",user)
            );
        }

        // users.push(req_body)
    }catch (error){
        res.status(100).send("Error")
    }




    // res.send( "okay");
})


router.post('/auth',async (req:express.Request,res:express.Response)=>  {



    let request_body=req.body
    //email , password

    let user:SchemaTypes.Iuser|null=await UserModel.findOne({email:request_body.email});
    if(user){
        if (user.password==request_body.password){

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
})

//routerw export krnw
export  default router;
