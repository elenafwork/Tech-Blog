const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
//all posts
router.get('/', async (res,req) => {
  try{
    const allPostsData= await Post.findAll
    ({
      include: [{ model: User}, {model: Comment }],
    });
    res.status(200).json(allPostsData);
  }  catch(err){
    res.status(500).json(err);
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

//creating comment
router.post('/:id/comment', withAuth,  async (req,res) => {
    try{
        const commentData=await Comment.create({
            comment_content: req.body.comment_content,
        });
        res.status(200).json(commentData);
    } catch(err){
        res.status(500).json(err);
    }
});


module.exports=router;