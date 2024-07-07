const express = require("express");
const app = express();
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 8000;
const { logger } = require("./middleware/logger");
const  corsConfig = require('./config/cors')

app.use(express.json());
app.use(logger);
app.use(cors(corsConfig));
app.use(express.static(path.join(__dirname,'public')));

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

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
