const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
//login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.render('dashboard',{ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// CREATE new user after Sign Up
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
			req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    });

      res.status(200).json(dbUserData);
    //});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//all users
router.get('/', async (req,res) => {
  try{
    const allUsersData=await User.findAll();
    res.status(200).json(allUsersData)
  } catch(err){
    res.status(500).json(err);
  }
});

//getting user by id - NOW WITHOUT AUTH
router.get('/:id', async(req,res) => {
  try{
    const userData=await User.findByPk(req.params.id)
    if(userData){
      res.status(200).json(userData);
    } else{
      res.status(404).json({message: 'User not found'})
    }
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;