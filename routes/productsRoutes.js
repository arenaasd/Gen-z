const express = require('express')
const router = express.Router()
const upload = require('../config/multer-config')
const productmodel = require('../models/product-model')

router.post('/create', upload.single('image'), async (req, res) => {
try{    const { image, name, price, discount, bgcolor, penalcolor, textcolor } = req.body
    const product = await productmodel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
    });
    req.flash('success', 'Product created successfully.')
    res.redirect('/owner/admin')
} catch(err) {

    res.send(err.message)

}
})


module.exports = router;