const express = require('express')
const router = express.Router()
const ownerModel = require('../models/owner-model')
const isloggedin = require('../middlewares/isloggedin')
const isowner = require('../middlewares/isOwner')


router.post('/create', async (req, res) => {
   const owners = await ownerModel.find();
   if (owners.length > 0) {
       return res.status(503).send('You Don’t have permission to create owner.');
   }

   const { fullname, email, password } = req.body;
   const createdowner = await ownerModel.create({
       fullname,
       email,
       password
   });
   res.status(201).send(createdowner);
});




router.get('/admin' ,isloggedin, isowner,async (req, res)=>{
    let success = req.flash('success')
    res.render('createProduct',{success})
})



module.exports = router;
