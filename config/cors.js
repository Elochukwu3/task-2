

const list = ['https://www.omokasngltd.com', 'http://localhost:8000/', 'http://localhost:5500/']
const corsConfig = {
    origin: (origin, callbaack)=>{
        if(list.indexOf(origin) !== -1 || !origin){
            callbaack(null, true)
        }
        else{
            callbaack(new Error('Not allowed by CORS origin'))
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
}

module.exports = corsConfig;