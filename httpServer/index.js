const  express = require('express');

const app = express();

app.get('/multiply',function(req,res){
   const a = parseInt(req.query.a)
   const b= parseInt(req.query.b)
   res.json({result: a*b})
});
// you don't need to pass it in question mark but a /
app.get('/add/:a/:b',function(req,res){
  const a = parseInt(req.query.a)
   const b= parseInt(req.query.b)
   res.json({result: a+b})
});

app.get('/divide',function(req,res){
   const a = parseInt(req.query.a)
   const b= parseInt(req.query.b)
   res.json({result: a/b})
});

app.get('/subtract',function(req,res){
  const a = parseInt(req.query.a)
   const b= parseInt(req.query.b)
   res.json({result: a-b})
});

app.listen(3000)