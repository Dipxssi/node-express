const express = require('express');

const jwt = require('jsonwebtoken');

const JWT_SECRET = "randomdasdipsha"
const app = express();

app.use(express.json());

const users =[];

app.post('/signup', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username: username,
    password: password
  })
  res.json({
    msg: "You are signed up"
  })
  console.log(users)
});


app.post('/signin', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = users.find(function (u) {
    if (u.username == username && u.password == password)
      return true;
    else
      return false;
  })

  if (foundUser) {
    //converting username to a jwt
    const token = jwt.sign({
      username : username
    },JWT_SECRET);


    //foundUser.token = token; 
    res.send({
      token: token
    })
  } else {
    res.status(403).send({
      mssg: "Invalid username or password"
    })
  }
  console.log(users)
});

//authenticated ep
app.get('/me', function (req, res) {
   const token = req.headers.token; 
   // converting jwt to username
   const decodedInfo = jwt.verify(token , JWT_SECRET);

   const username = decodedInfo.username ;

   const foundUser = users.find(u => u.username === username);

   
  if (foundUser){
   res.json({
      username : foundUser.username,
      password : foundUser.password
   })
  } else {
    res.json({
      mssg : "token invalid"
    })
  }
})

app.listen(3000)