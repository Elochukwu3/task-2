const fsPromise = require("fs").promises;
const fs = require("fs");

const {v4: uuid} = require("uuid");
const {format} = require("date-fns");
const path = require("path");


const logEvent = async(message = "hii", file,ext='.txt')=>{

    const dateTime = format(new Date(), "yyyyMMdd/tHH:mm:ss");
    const logTime = `${uuid()} \t ${dateTime} ${message}\t`;
    try {
        if(!fs.existsSync(path.join(__dirname,'..', 'log'))){
            await fsPromise.mkdir(path.join(__dirname,'..', 'log'))
        }
      await fsPromise.appendFile(path.join(__dirname,'..', "log", `${file}${ext}`), logTime)
    } catch (error) {
        console.log(error)
    }
    
}

const logger = ((req, res, next) => {
    logEvent(
      `${req.method}\t ${req.path} ${req.headers.origin}`,
      "stderr"
    );
  
    next();
  })

module.exports = {logger}