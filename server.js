const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const initRoutes = require('./routes/web');
require('dotenv').config();
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');


// database connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: false });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'console error:'));
db.once('open', () => {
  console.log("db connected")
})


// session store

// session configuratiom
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    collectionName: 'sessions'
  }),
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}))


app.use(flash())

//assets
app.use(express.static('public'))

// json
app.use(express.json());

// gloal middleware

//if we given next in middleware we have to call that callback other wise requuest will hang
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})

//set tempplate engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

initRoutes(app);


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`)
  console.log(`http://localhost:${PORT}`)
})