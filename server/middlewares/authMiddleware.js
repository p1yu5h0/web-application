const {JWT_SECRET} = require("../config")
const jwt = require("jsonwebtoken")

const authMiddleware = (req, resp, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return resp.status(403).json({msg: "no token"});
    }

    const token = authHeader.split(" ")[1];
    
    try{

        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        } else {
            resp.status(403).json({
                err
            })
        }
        
    }catch(err){
        resp.status(403).json({
            err
        })
    }
}

module.exports = {
    authMiddleware
}