const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'randomdasdipshaa'

const app = express();

const users =[];

app.use(express.json());

app.get("/",function(req,res){
  res.sendFile(path.join(__dirname,'public','index.html'))
})

app.post('/signup',function(req,res){
  const username = req.body.username
  const password = req.body.password
  users.push({
    username : username,
    password : password
  })                                         
  res.json({
    mssg : "You are signed up"
  })

})

app.post('/signin',function(req,res){
  const username = req.body.username
  const password = req.body.password

  const foundUser = users.find( u => u.username == username)

  if(!foundUser){
    res.send({
      mssg: "Credentials are incorrect"
    })
    return
  } else {
    const token = jwt.sign({
      username : username
    }, JWT_SECRET)

    res.json({
      token : token
    })
  }
})

function auth(req,res,next){
   
  const token = req.headers.token;
  const decodedData = jwt.verify(token , JWT_SECRET);
  
  if(decodedData.username){
    req.username = decodedData.username
     next()
  }else{
    res.json({
      mssg : "You are not logged in"
    })
  }

}

app.get('/me',auth,function(req,res){
        const findUser = users.find( u =>u.username === req.username )
        res.json({
          username : findUser.username,
          password : findUser.password
        })
      }
)

app.listen(3000);