const express = require('express');
const path = require('path');
const initDB = require('./db/initializeDB');

// set port
const PORT = process.env.PORT;

const app = express();

// set templating language to ejs
app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the 'public' directory

app.get('/', (req, res) => {
    res.render('index');
});

const startServer = async () => {
    await initDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
