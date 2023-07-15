const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
//all posts
router.get('/', async (res,req) => {
  try{
    console.log('================================================');
    
    const allPostsData= await Post.findAll()
    // ({
    //   include: [{ model: User}, {model: Comment }],
    // });
    res.status(200).json(allPostsData);
  }  catch(err){
    //res.status(500).json(err);
  }
});

//get by its id
router.get('/:id', async (req, res) => {
    
    try {
      const postData= await Post.findByPk
      (req.params.id,
        {include: [{ model: User}, {model: Comment }],
      });
      if (!postData){
        res.status(404).json({message: 'No Product  found with this id!'});
        return;
      }
      res.status(200).json(postData);
    } catch (err){
      res.status(500).json(err);
    }
    
  });
//creating post
////no auth
router.post('/', async (req,res) => {
  try {
    const newPost=await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
        })
     res.status(200).json(newPost);


  }catch(err){
     res.status(400).json(err)
  }
})
//creating comment
router.post('/:id/comment', async (req,res) => {
    try{
       console.log('-----------------------------------------------------------------------');
       
        const commentData=await Comment.create({
            post_id: req.body.post_id,
            comment_content: req.body.comment_content,
            user_id: req.body.user_id
        });
        res.status(200).json(commentData);
    } catch(err){
        res.status(400).json(err);
    }
});


module.exports=router;