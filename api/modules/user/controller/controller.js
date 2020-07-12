"use strict"
const service = require('../service/userService');
const jwt = require('jsonwebtoken');
const sha256 = require('sha256');
class User{
    constructor(){

    }

   async signup(req,res){
       console.log(req.data.id)
   let  {fullName,email,password,phoneNo} = req.body;
    let resultData =await service.checkAleradyUser(email);
    if(resultData){
        res.status(200).json({status:false,message:"User already exists."});
    }else{
        service.signup({fullName,email,password,phoneNo}).then(resultData1=>{
            if(resultData1){
            res.status(200).json({status:true,message:"Signup successful"});
            }else{
            res.status(500).json({status:false, message:"Internal server error"})
            }
        })
    }
    }

    async login(req,res){
        let {email,password}=req.body;
        let resultData = await service.login(email);
        if(resultData){
            if(resultData.password == sha256(password)){
                console.log(resultData.password , password)
                var older_token = jwt.sign({ id :resultData.id, iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
                res.status(200).json({status:true, message:"Lgoin successfull",token:older_token});
            }else{
                res.status(200).json({status:false, message:"Incorrect Password"})
            }
        }else{
            res.status(500).json({status:false, message:"Internal server error."})
        }
    }

    async tweet(req,res){
        let comments = req.body.comment;
        let userId =req.data.id;
        let resultData = await service.tweet({comments,userId});
        if(resultData){
            res.status(200).json({status:true,message:"Tweet submit successful."})
        }else{
            res.status(500).json({status:false,message:"Internal server error"});
        }
    }

    async tweetList(req,res){
        let {page, limit} = req.query;
        let userId = req.data.id;
        let totalCount = await service.tweetCount({userId});
         let resultData = await service.tweetList({page,limit,userId});
         if(resultData){
             let result = {};
             result.totalCount = totalCount;
             result.data = resultData;
             res.status(200).json({status:true, message:"success",data:result})
         }else{
            res.status(200).json({status:true, message:"Data not found",data:{}})
         }
    }

    async updateTweet(req,res){
        let {tweetId,comment}=req.body;
        let resultData = await service.updateTweet({tweetId,comment});
        if(resultData){
            res.status(200).json({status:false,message:"Tweet has been updated"});
        }else{
            res.status(200).json({status:false,message:"Tweet has been not updated. Please try again"});
        }

    }

    async deleteTweet(req,res){
        let tweetId =req.query.tweetId;
        let resultData = await service.deleteTweet(tweetId);
        if(resultData){
            res.status(200).json({status:true,message:"Tweet has been deleted."})
        }else{
            res.status(200).json({status:false,message:"Tweet has been nt deleted."})
        }
    }







    
}

module.exports = new User();