import { Client } from "pg"
import express from "express";

const app = express()

app.use(express.json());

const pgClient = new Client("postgresql://neondb_owner:npg_07vTfDWnQMwV@ep-dark-cake-a1br3iz5-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")

// const pgClient = new Client({
//   user: "neondb_owner",
//   password: "npg_07vTfDWnQMwV",
//   port: 5432,
//   host: "ep-dark-cake-a1br3iz5-pooler.ap-southeast-1.aws.neon.tech",
//   database: "neondb",
// })
 pgClient.connect();

 app.post("/signup",async (req,res) =>{
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

 //avoiding sql injection
  const insertQuery = `INSERT INTO users (username , email, password) VALUES ($1 , $2 , $3)`
  const response = await pgClient.query(insertQuery,[username, email , password])

  res.json({
    mssg : "You have signed up"
  })
 })



app.listen(3000);