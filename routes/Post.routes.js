

const express = require('express');
const { PostModel } = require('../model/Post.model');
// const { auth } = require('../middleware/auth.middleware');

const postRoutes = express.Router()

// postRoutes.use(auth)

// get all posts
postRoutes.get("/", async(req,res,next) => {

  const {device} = req.query
  const {device1 , device2} = req.query

    try {
      if(device) {

        const posts = await PostModel.find({userID: req.body.userID, device});
        res.status(200).send(posts)
      } else if (device1) {
        const posts = await PostModel.find({userID: req.body.userID, device: [device1, device2]});
        res.status(200).send(posts)

      }  else {
        const posts = await PostModel.find({userID: req.body.userID});
        res.status(200).send(posts)

      }

      } catch (error) {
        res.status(400).send({ err: error.message });
      }
})


// create posts
postRoutes.post("/create", async(req,res,next) => {

    try {

      const newPost = new PostModel(req.body)
      await newPost.save()
        
        res.status(200).send({"msg": "post created"})
       
      } catch (error) {
        res.status(400).send({ err: error.message });
      }
})


// update posts
postRoutes.patch("/update/:id", async(req,res,next) => {

  const {id} = req.params
    try {
      await PostModel.findByIdAndUpdate({userID: req.body.userID, _id:id}, req.body);
     

        res.status(200).send({"msg": "post updated"})
       
      } catch (error) {
        res.status(400).send({ err: error.message });
      }
})

// delete posts
postRoutes.delete("/delete/:id", async(req,res,next) => {

  const {id} = req.params
    try {
      await PostModel.findByIdAndDelete({userID: req.body.userID, _id:id});
     

        res.status(200).send({"msg": "post deleted"})
       
      } catch (error) {
        res.status(400).send({ err: error.message });
      }
})


module.exports = {
    postRoutes
}