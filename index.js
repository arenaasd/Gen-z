const express = require('express');
const app = express();
const path = require('path');
const flash = require('connect-flash');
const expressSession = require('express-session');
const cookieparser = require('cookie-parser');
const registerroute = require('../routes/registerRoutes');
const productsroute = require('../routes/productsRoutes');
const db = require('../config/mongoose-connection');
const loginroute = require('../routes/loginRoutes');
const shop = require('../routes/index');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.use(cookieparser());
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash());

app.use('/user', registerroute);
app.use('/product', productsroute);
app.use('/user', loginroute);
app.use('/', shop);

// Wrap express app with Vercel's handler
const server = require('http').createServer(app);
module.exports = server;
