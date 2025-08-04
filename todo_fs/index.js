const express = require("express")
const app = express();
const {UserModel , TodoModel} = require("./db")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
mongoose.connect("mongodb+srv://dipshadas4:Dips2004@cluster0.a46rpah.mongodb.net/todo-app-dipsha")
const {auth,JWT_SECRET} =require("./auth")



app.use(express.json());

app.post('/signup',async function(req,res){
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
      email : email,
      password : password,
      name : name
  })

  res.json({
    mssg: "You are signed up"
  })
})

app.post('/login',async function(req,res){
    const email = req.body.email
    const password = req.body.password

    const response = await UserModel.findOne({
      email: email,
      password:password
    })

    if(response){
      const token = jwt.sign({
        id : response._id.toString()
      },JWT_SECRET)
      res.json({
        token
      })
    } else{
      res.status(403).json({
        mssg: "Incorrect creds"
      })
    }
})
app.post('/todo', auth ,async function(req,res){
  const userId = req.userId
  const title = req.body.title;
  const done = req.body.done;
  
  await TodoModel.create({
    title:title,
    done:done,
    userId : userId
  })
  res.json({
    mssg: "Todo was created"
  })
})
app.get('/todos', auth ,async function(req,res){
  const  userId = req.userId
  const todos = await TodoModel.find({
      userId : userId
  })
  res.json({
    userId: userId
  })
})
app.listen(3000)