
const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
   const header = req.headers.Authorization || req.headers.authorization;

   try {
   if(!header?.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Access denied, token missing!' });
   }

     const token = header.split(' ')[1];
     if(token){
     const decoded =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
console.log(decoded);
         req.user = decoded
         next();
     }
    } catch (error) {
        res.status(400).send({ message: 'Invalid token!' });
    }
   
  

}
module.exports = authenticateToken
