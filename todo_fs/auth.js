const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomdas";

function auth(req,res,next){
  const token = req.headers.authorizartion;

  const response = jwt.verify(token , JWT_SECRET);

  if(response){
    req.userId = token.userId;
    next();
  } else{
    res.status(403).json({
      mssg : "Incorrect creds"
    })
  }
}

module.exportd = {
  auth,
  JWT_SECRET
}