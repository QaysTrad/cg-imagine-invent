var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/assgin')
mongoose.connect('mongodb://qays:qays123@ds117431.mlab.com:17431/assgin')

var db = mongoose.connection

db.on('error', function () {
  console.log('mongoose connection error')
})

db.once('open', function () {
  console.log('mongoose connected successfully')
})

var user = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true },
  password: {type: String, required: true }
})

var task = mongoose.Schema({
  taskName: {type: String, required: true},
  complete: {type: Boolean },
  date: {type: Date},
  username: {type: String }
})

var User = mongoose.model('User', user)
var Task = mongoose.model('Task', task)

module.exports.User = User
module.exports.Task = Task
