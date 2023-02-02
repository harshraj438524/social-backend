const express = require('express')
const router = express.Router()
const post=require('../modals/Post');
const user = require('../modals/UserSchema');

//create post
router.post('/',async(req,res)=>{
   const newPost= new post(req.body);
   try {
      const savePost=await newPost.save();
      res.status(200).json(savePost);
   } catch (error) {
      res.status(500).send(error);
   }
})

//put post
router.put('/:id',async(req,res)=>{
     const Post=await post.findById(req.params.id);
     try{
     if(Post.userId===req.body._id){
      await Post.updateOne({$set:req.body});
      res.status(200).json("the post has been updated")
     }
     else{
         res.status(401).send("you can only update your post");
     }
   }
   catch(e){
      res.status(500).json(e);
   }
})

//delete

router.delete('/:id',async(req,res)=>{
   const Post=await post.findById(req.params.id);
   try{
   if(Post.userId===req.body._id){
    await Post.deleteOne();
    res.status(200).json("the post has been deleted")
   }
   else{
       res.status(401).json("you can only delete your post");
   }
 }
 catch(e){
    res.status(500).json(e);
    
 }
})

//like

router.put('/:id/likes',async(req,res)=>{
try{
    const Post=await post.findById(req.params.id);
    if(!Post.likes.includes(req.body._id)){
      await Post.updateOne({$push:{likes:req.body._id}});
      res.status(200).json("the post has been liked");
    }
    else{
      await Post.updateOne({$pull:{likes:req.body._id}});
      res.status(200).json("the  post has been disliked");
    }
   }
   catch(e){
      res.status(500).json(e);
   }
})


//get post
router.get('/:id',async (req,res)=>{
  try {
    const Post=await post.findById(req.params.id);
    res.status(200).json(Post);
   
  } catch (error) {
   res.status(500).send("server error");
  }
})


//get all post of user
router.get('/timeline/:id',async (req,res)=>{
   try {
      const currentUser=await user.findById(req.params.id);
      const Post =await post.find({userId:req.params.id});
      const friendPosts=await Promise.all(currentUser.followings.map(async(id)=>{
         return post.find({userId:id})
      }));

      res.status(200).json(Post.concat(...friendPosts));
   }
   catch (error) {
    res.status(500).send("server error");
   }
 })
 
//get all user post

router.get('/allpost/:id',async (req,res)=>{
   try {
      const currentUser=await user.findById(req.params.id);
      const Post =await post.find({userId:req.params.id});
      


      res.status(200).json(Post);
   }
   catch (error) {
    res.status(500).send("server error");
   }
 })
 



module.exports = router;