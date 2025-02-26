const usermodel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generate-token');

module.exports.registeruser = async function (req, res) {
    try {
        const { fullname, email, password } = req.body;

       let registeruser = await usermodel.findOne({email: email})

       if(registeruser){
        req.flash('error', 'Email already exists');
        return res.redirect('/user/register')
       }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await usermodel.create({
            fullname,
            email,
            password: hashedPassword
        });

        const token = generateToken(user);
        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        res.send(error.message);
    }
};


module.exports.loginUser = async function (req, res) {
    const {email , password} = req.body

   const logininguser = await usermodel.findOne({email: email})

   if(!logininguser){
   req.flash('error', 'Email or password is incorrect');
  return res.redirect('/user/login')
   }
   const pass = await bcrypt.compare(password, logininguser.password)
   if(!pass){
    req.flash('error', 'Email or password is incorrect');
  return res.redirect('/user/login')
   }
   const token = generateToken(logininguser);
    res.cookie('token', token);
    res.redirect('/')
}