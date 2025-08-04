const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Objectid = mongoose.Schema.Types.Objectid;

//defining the schemas
const User = new Schema({
  email : String,
  password :String,
  name:String
})

const Todo = new Schema({
  title:String,
  done:Boolean,
  userId: {type: Schema.Types.ObjectId, ref:'users'}
})

//helps to enter data in collections
const UserModel = mongoose.model('users',User)
const  TodoModel = mongoose.model('todos',Todo)

//exporting
module.exports = {
  UserModel : UserModel,
  TodoModel : TodoModel
}