
//all users get back end
import express from "express";
import UserModel from "../models/user.model";
import customResponse from "../dtos/custom.response";
import * as SchemaTypes from "../types/SchemaTypes";
import jwt, {Secret} from "jsonwebtoken";
import process from "node:process";
import * as UserController from "../controllers/user.controller"

//userwa route krnn express wala router manage object ek use krnw
const router=express.Router();



router.get('/all',UserController.getAllUser)

//time ek yana nisa asynchoronous kala function eka
router.post('/',UserController.newUser)


router.post('/auth',UserController.signUsers)

//routerw export krnw
export  default router;
