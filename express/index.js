//creating a http server
//express
//node default library => nope!

const express = require("express");
const app = express();

/*
function sum (n){
  let ans = 0;
  for(let i =1 ; i<=n ; i++ ){
    ans = ans + i
  }
  return ans;
}*/
// req , res => request and response
//request that can be send
//get = asking something
//poast = to put data on the backend
//put = updating the data
//delete

//status code
//200 = everything went fine
//404 = route not available
//500 = smtg went wrong
//411 = inputs are incorrect 
//403= you were not allowed , don't have access
/*app.get("/",function(req,res){
   const n = req.query.n;
   const ans = sum(n);
   res.send("hi your answer is "+ ans)
})*/


const users = [{
  name: "John",
  kidneys: [{
    healthy: false
  }]
}];

app.use(express.json());

app.get("/", function (req, res) {
  // remeber **query request **
  const johnKidneys = users[0].kidneys;
  const numOfKidneys = johnKidneys.length;
  let numOfHealthyKidneys = 0;
  for (let i = 0; i < johnKidneys.length; i++) {
    if (johnKidneys[i].healthy) {
      numOfHealthyKidneys = numOfHealthyKidneys + 1;
    }
  }
  const numOfUnhealthyKidneys = numOfKidneys - numOfHealthyKidneys;
  res.json({
    numOfKidneys,
    numOfHealthyKidneys,
    numOfUnhealthyKidneys
  })
})

app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy
  users[0].kidneys.push({
    healthy: isHealthy
  })
  res.json({
    msg: "Done"
  })
})

app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true
  }
  res.json({})
})

app.delete("/", function (req, res) {
   if(isThereAtLeastOneKidney()){
      const newKidneys = [];
       for (let i = 0; i < users[0].kidneys.length; i++) {
        if(users[0].kidneys[i].healthy){
            newKidneys.push({
              healthy: true
            })
        }
       }   
    users[0].kidneys =  newKidneys
    res.json({msg: "done"})
   } else {
    res.status(411).json({
      msg : "You have no bad kidneys"
    })
   }
   
})
function isThereAtLeastOneKidney(){
   let atleastOneUnhealthyKidney = false;
   for(let i =0 ; i < users[0].kidneys.length ; i++){
    if(!users[0].kidneys[i].healthy){
      atleastOneUnhealthyKidney = true;
    }
   }
   return atleastOneUnhealthyKidney
}

app.listen(3000);