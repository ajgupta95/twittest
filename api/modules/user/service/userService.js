"use strict"
const userModel = require('../model/user');
const { model } = require('mongoose');
const promise =require('promise');
const { resolve, reject } = require('promise');
const sha256 = require('sha256');
const tweetModel = require('../model/tweet');


class UserService{
    constructor(){

    }

    checkAleradyUser(email){
        return new promise((resolve,reject)=>{
            userModel.findOne({email:email},function(err,result){
                result ? resolve(resolve) : resolve(false)
            });
        })
    }

    signup(data){
        console.log(data)
        return new promise((resolve,reject)=>{
            let userObject = new userModel({
                fullName:data.fullName,
                email:data.email,
                phoneNo:data.phoneNo,
                password:sha256(data.password)
            });
            userObject.save().then(doc=>{
                doc ? resolve(doc) : resolve(false);
            })
        })
    }

    login(email){
        return new promise((resolve,reject)=>{
            userModel.findOne({email:email}).then(result=>{
                result ? resolve(result) : resolve(false);
            })
        })
    }

    tweet(data){
     return new promise((resolve,reject)=>{
         let tweets = new tweetModel({
             userId:data.userId,
             comments:data.comments
         });
         tweets.save().then(result=>{
             result ? resolve(result) : resolve(false);
         })
     })
    }

    tweetList(data){
        return new promise((resolve,reject)=>{
            let page = data.page ? data.page : 1;
            let limit = data.limit ? limit: 10;
            tweetModel.find({userId:data.userId}).populate('userId').limit(limit)
            .skip(limit * page).sort({createdAt:-1}).exec(function(err, c) {
                c ? resolve(c) : resolve(false);
            });
        })
    }
    tweetCount(data){
        return new promise((resolve,reject)=>{
            tweetModel.find({userId:data.userId}).count().then(result=>{
                result ? resolve(result) : resolve(false);
            })
        })
    }

    updateTweet(data){
        return new promise((resolve,reject)=>{
            tweetModel.findByIdAndUpdate({_id:data.tweetId}, {$set:{comments:data.comment}}, {new: true}).then(result=>{
                result ? resolve(result) : resolve(false);
            })
        })
    }

    deleteTweet(id){
        return new promise((resolve,reject)=>{
            tweetModel.remove({_id:id}).then(result=>{
                result ? resolve(result) : resolve(false);
            })
        })
    }
}

module.exports=new UserService();