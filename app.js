require('express-async-errors');
require('dotenv').config();

const connectDB = require('./config/db')
const express = require("express");
const app = express();
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 8000;
const{ errorLogger} = require("./middleware/logger");
const  corsConfig = require('./config/cors');
const authRoute = require('./routes/auth')
const orgRoute = require('./routes/org')

app.use(express.json());
app.use(cors(corsConfig));
connectDB();    

app.use(express.static(path.join(__dirname,'public')));
app.use('/auth', authRoute);
app.use('/api', orgRoute);

app.all('*', (req, res) => {
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'public', 'view', '404.html'));
    }else if(req.accepts('json')){
        res.json({
            error: 'invalid request',
        })
    }else{
        res.type('text').send('Not Acceptable');
    }
})
app.use(errorLogger);
app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));

module.exports = app;