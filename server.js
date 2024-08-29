const express = require('express');
const path = require('path');
const initDB = require('./db/initializeDB');
const messagesRouter = require('./routes/messages');

// set port
const PORT = process.env.PORT || 1568;

const app = express();

// set templating language to ejs
app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the 'public' directory

// routes
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
