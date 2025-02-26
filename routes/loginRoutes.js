const express = require('express')
const router = express.Router()
const { loginUser } = require('../controllers/auth-controller');

router.get('/login' , (req, res)=>{
    let error = req.flash('error')
    res.render('login', {error: error});
});

router.post('/login', loginUser)


module.exports = router;