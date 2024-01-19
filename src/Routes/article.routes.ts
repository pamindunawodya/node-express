import express from "express";
import ArticleModel from "../models/article.model";
import {ObjectId} from "mongodb";
import customResponse from "../dtos/custom.response";
import UserModel from "../models/user.model";
import * as Middleware from "../middlewares/index"

const router=express.Router();





router.post('/',async (req:express.Request,res:express.Response)=>{
    try {

        let req_body=req.body;

        console.log(req_body);

        const articleModel= new ArticleModel({
            title:req_body.title,
            description:req_body.description,
            user:new ObjectId(req_body.user)
        });

        await articleModel.save().then(r=> {
            res.status(200).send(
                new customResponse(200,"Article Created Sucessfully")
            )

        }).catch(e=>{
            res.status(100).send(
                new customResponse(100,"Something Went Wrong")
            )
            console.log(e);

        });



    }catch (error){
        res.status(401).send("error");
    }

})


router.get('/get',async (req:express.Request,res:express.Response)=> {

    try {

        let req_query:any=req.query;
        let size:number=req_query.size;
        let page:number=req_query.page;



        //size 10 page 1 nam val:(db eke collection wala tiyana 1*10 =10 palaweni 10 ain karl ithuru tike 1 weni 10 gnnw)
        //const articles = await ArticleModel.find().limit(req.query.size).skip(req.query.size*req.page);
        //error resolving
        const articles = await ArticleModel.find().limit(size).skip(size*(page-1));


        let documentCount=await ArticleModel.countDocuments();
        let pageCount=Math.ceil(documentCount/size);


        res.status(200).send(
            new customResponse(200, "Articles Are Found Sucessfully", articles,pageCount)
        );

    }catch (error){
        res.status(100).send("Error")
    }

})


router.get('/:username',async (req:express.Request,res:express.Response)=>{

    try {

        let req_query:any=req.query;
        let size:number=req_query.size;
        let page:number=req_query.page;


        // console.log(req.params.username);

        let username:string=req.params.username;

        let user= await UserModel.findOne({username:username});

        //user kenek nttm
        if (!user){
            res.status(404).send(
                new  customResponse(404,"user are not found")
            )
        }else {
            let articles=await ArticleModel.find({user:user._id}).limit(size).skip(size*(page-1));

            let documentCount=await ArticleModel.countDocuments({user:user._id});
            let pageCount=Math.ceil(documentCount/size);


            res.status(200).send(
                new customResponse(200,"Articles Are Found Sucessfully",articles,pageCount)
            )
        }
    }catch (error){
        res.status(100).send("Error")
    }
})


//token find user get data

router.get('/get/my',Middleware.verifyToken,async (req:express.Request,res:any)=>{

    try {

        let req_query:any=req.query;
        let size:number=req_query.size;
        let page:number=req_query.page;


        let user_id=res.tokenData.user._id;

        let articles=await ArticleModel.find({user:user_id}).limit(size).skip(size*(page-1));

        let documentCount=await ArticleModel.countDocuments({user:user_id});

        let pageCount=Math.ceil(documentCount/size);

        res.status(200).send(
            new customResponse(200,'Articles Are Found Sucessfully',articles,pageCount)
        )



    }catch (error){
        res.status(100).send("Not Found")
    }

})


//update article

router.put('/article',Middleware.verifyToken,async (req:express.Request,res:any)=>{


    try{

        //check article by user

        let req_body:any=req.body
        let user_id=res.tokenData.user._id;
        let article=  await ArticleModel.find({_id:req_body.id,user:user_id})

        console.log('test');

        if (article){

            await ArticleModel.findByIdAndUpdate({_id:req_body.id},{
                title:req_body.title,
                description:req_body.description
            }).then(r=>{
                res.status(200).send(
                    new customResponse(200,"Article Updated Sucessfully")
                )
            }).catch(e=>{
                console.log(e);
                res.status(100).send(
                    new customResponse(100,"Something went Wrong")
                )
            })

        }else {
            res.status(401).send(
                new customResponse(401,"Access Denied")
            )
        }


    }catch (error){
        res.status(100).send(error);
    }
})

//delete article
router.delete('/article/:id',Middleware.verifyToken,async (req:express.Request,res:any)=>{


    try{

        let articleID:string=req.params.id;
        let user_id=res.tokenData.user._id;
        let article=  await ArticleModel.find({_id:articleID,user:user_id})

        if (article){

            await ArticleModel.deleteOne({_id:articleID,user:user_id}).then(r=>{

                res.status(200).send(
                    new customResponse(200,"Article Deleted Sucessfully")
                )
            }).catch(e=>{
                console.log(e);
                res.status(100).send(
                    new customResponse(100,"Something went Wrong")
                )
            })


        }else {
            res.status(401).send(
                new customResponse(401,"access denied")
            )}


    }catch (error){
        res.status(100).send(error);
    }


})

export default router;