const fsPromise = require("fs").promises;
const fs = require("fs");
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const path = require("path");

const logError = async (error, file = "stderr", ext = ".log") => {
    const dateTime = format(new Date(), "yyyyMMdd/HH:mm:ss");
    const logMessage = `${uuid()} \t ${dateTime} \t ${error.message || error}\n`;

    try {
        const logDir = path.join(__dirname, '..', 'log');
        if (!fs.existsSync(logDir)) {
            await fsPromise.mkdir(logDir);
        }
        await fsPromise.appendFile(path.join(logDir, `${file}${ext}`), logMessage);
    } catch (err) {
        console.error("Failed to log error:", err);
    }
};

// Middleware to log errors
const errorLogger = (err, req, res, next) => {
    logError(err);
    next(err);
};

module.exports = { errorLogger, logError };
