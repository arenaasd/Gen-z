const express = require('express')
const app = express();
const path = require('path');
const flash = require('connect-flash');
const expressSession = require('express-session');
const cookieparser = require('cookie-parser');
const ownersroute = require('./routes/ownerRoutes')
const registerroute = require('./routes/registerRoutes')
const productsroute = require('./routes/productsRoutes')
const db = require('./config/mongoose-connection');
const loginroute = require('./routes/loginRoutes')
const shop = require('./routes/index')
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use('/user/register', express.static(path.join(__dirname, 'build')));
app.use(cookieparser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.set('views', path.join(__dirname, 'views'));






app.use('/owner', ownersroute)
app.use('/user', registerroute)
app.use('/product', productsroute)
app.use('/user', loginroute)
app.use('/', shop)





module.exports = app;
