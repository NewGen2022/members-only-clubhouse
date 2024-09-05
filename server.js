const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('./configPassport');
const PgSession = require('connect-pg-simple')(session);
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const initDB = require('./db/initializeDB');
const messagesRouter = require('./routes/messages');
const authenticationRouter = require('./routes/authentication');
const pool = require('./db/pool');

require('dotenv').config();

// set port
const PORT = process.env.PORT || 1568;

const app = express();

// set templating language to ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the 'public' directory

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new PgSession({
            pool: pool,
            tableName: 'session',
            createTableIfMissing: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 3,
            secure: false,
        },
    })
);
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use Passport session
app.use(flash());

// routes
app.use('/', authenticationRouter);
app.use('/', messagesRouter);

const startServer = async () => {
    try {
        await initDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
