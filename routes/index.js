const express = require('express');
const router = express.Router();
const isloggedin = require('../middlewares/isloggedin');
const productmodel = require('../models/product-model')
const usermodel = require('../models/user-model')

router.get('/', isloggedin, async (req, res) => {
    let products = await productmodel.find();
    let success = req.flash('success')
    res.render('index', {products , success});
});

router.get('/cart',isloggedin,async (req, res) =>{
    let user = await usermodel.findOne({ email: req.user.email }).populate('cart').lean();
    let cartItemsWithTotal = user.cart.map((item) => {
        let total = (Number(item.price) - Number(item.discount)) + 20; // Adding 20 as shipping fee
        return {
            ...item,
            total
        };
    });

    res.render('add-to-cart', {user , cartItemsWithTotal});
})

router.get('/cart:productid',isloggedin,async (req, res) =>{
    let user =await usermodel.findOne({email: req.user.email});
    await user.cart.push(req.params.productid)
    await user.save();
    req.flash('success', 'Added to cart successfully');
    res.redirect('/')
})

router.get('/logout',isloggedin, (req, res) =>{
    res.cookie('token', '');
    res.redirect('/user/login');
})

router.get('/cartdel/:productid',isloggedin,async (req, res) =>{
    let user =await  usermodel.findOneAndDelete({email: req.user.email}).limit(12);
    user.cart.pull(req.params.productid);
    user.save();
    res.redirect('/cart');
})

module.exports = router;
