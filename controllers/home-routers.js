const router = require('express').Router();
const { Post } = require('../models');
const { Comments} =require('../models')
//const withAuth = require('../utils/auth');

router.get('/',  async (req, res) => {
  console.log('LOOK HERE');
  
  try {
    const allPostsData = await Post.findAll({
      attributes: [['title', 'content']],
     //order: [['created_on', 'DSC']],
    });

    const posts = allPostsData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req,res) => {
  try {
    const postData=await Post.findByPk(req.params.id, {
      include: [{model: Comment}]
    });
   if (!postData) {
      res.status(404).json({message: 'Post is not found'});
      return;
    } 
    res.status(200).json(postData);
  
  } catch (err){
    res.status(500).json(err);
  }
});

router.post('/post/:id/comment', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
