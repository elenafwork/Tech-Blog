const router=require('express').Router();
const apiRouters=require('./api');

router.use('/api', apiRouters);

router.use((req,res) => {
    res.send("<h1> Wrong route! </h1>")
});

module.exports=router;
