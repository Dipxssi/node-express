const express  = require("express")

const app = express();

//function returns a boolean if the age of the person is more than 14
// function isOldEnough(age){
//   if(age >= 14){
//     return true
//   }else{
//     return false
//   }
// }

function isOldEnoughMiddleware(req,res,next){
  const age = req.query.age;
  if(age >= 14){
    next();
  }else{
    res.json({
      msg : "Sorry you are not of age yet"
    })
  }
}

//app.use(isOldEnoughMiddleware);  when all the routes need middleware

app.get('/ride2',isOldEnoughMiddleware,function(req,res){ 
   res.json({
        msg: "You have sucessfully riden the ride 2"
    })
})

app.get('/ride1',isOldEnoughMiddleware,function(req,res){ 
    res.json({
        msg: "You have sucessfully riden the ride 1"
    })
})

app.listen(3000);