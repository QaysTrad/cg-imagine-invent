var mongoose = require('mongoose') 
 mongoose.connect('mongodb://localhost/assgin') 

var db = mongoose.connection 

db.on('error', function () {
  console.log('mongoose connection error')
}) 
db.once('open', function () {
  console.log('mongoose connected successfully')
}) 

var user = mongoose.Schema({
  userName: { type : String, required : true , unique : true},
  email:{ type : String, required : true },
  passWord: { type : String, required : true },
});


var User = mongoose.model('User', user);

module.exports.User = User
