const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');
router.use(withAuth);
router.get('/', withAuth, async(req,res) =>{
    try {
        const postData = await Post.findAll({
          attributes: 'title',
          order: [['title', 'DSC']],
        });
    
        const posts = postData.map((post) => post.get({ plain: true }));
    
        res.render('dashboard', { 
          posts,
          logged_in: req.session.logged_in,
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/post/:id', withAuth, async (req,res) =>{
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

router.post('/new', withAuth, async (req,res) => {
    try {
        const newPost= await Post.create({
            title: req.body.title,
            content: req.body.content,
        });
        res.status(200).json(newPost);
    } catch (err){
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.update(req.body, { 
        where: {
          id: req.params.id,
        },
      });
      if (postData){
        res.status(200).json(postData);
      } else {
        res.status(404).json.end();
      }
    } catch (err){
      res.status(500).json(err);
    }
    
  });

  router.delete('/:id', withAuth, async  (req, res) => {
    try {
     const postData = await Post.destroy
     ({
       where: {
         id: req.params.id,
       }
     });
     if (!postData){
       res.status(404).json({message: 'Post is not found'});
       return;
     }
     res.status(200).json(postData);
    } catch (err){
     res.status(500).json(err);
    }
    
   });

   module.exports = router;