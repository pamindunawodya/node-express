import express from "express";
import ArticleModel from "../models/article.model";
import {ObjectId} from "mongodb";
import customResponse from "../dtos/custom.response";
import UserModel from "../models/user.model";
import * as Middleware from "../middlewares/index"
import * as ArticleController from "../controllers/article.controllers"

const router=express.Router();





router.post('/',ArticleController.createArticle)


router.get('/get',ArticleController.getAllArticles)


router.get('/:username',ArticleController.getArticleByUserName)


//token find user get data
router.get('/get/my',Middleware.verifyToken,ArticleController.getMyArticle)


//update article
router.put('/article',Middleware.verifyToken,ArticleController.updateArticle)


//delete article
router.delete('/article/:id',Middleware.verifyToken,ArticleController.deleteArticle)


export default router;