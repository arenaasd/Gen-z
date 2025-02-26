const express = require('express')
const router = express.Router()
const { registeruser } = require('../controllers/auth-controller');


router.get('/register', (req, res) => {
    let error = req.flash('error');
    res.render('register', { error });
});

router.post('/create', registeruser);



module.exports = router;