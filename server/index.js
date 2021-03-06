let express = require('express')
let path = require('path')
let db = require('../database/index')
let bodyParser = require('body-parser')
let session = require('express-session')

let help = require('./utilities')

const app = express()
app.use(express.static(path.join(__dirname, '../react-client/dist')))
app.use(bodyParser.json())
app.use(session({
  secret: 'very very secret',
  resave: true,
  saveUninitialized: true
}))

app.post('/signup', function (req, res) {
  var username = req.body.username
  var password = req.body.password
  var email = req.body.email

  db.User.find({username: username}, function (err, data) {
  	if (err) {
  		res.sendStatus(404)
  	} else {
  		var user = new db.User({
        username: username,
        email: email,
        password: password
      })
      user.save(function (err, data) {
        if (err) {
          throw err
        }
        help.createSession(req, res, data.username)
 			})
  		}
  })
})

app.post('/login', function (req, res) {
  var username = req.body.username
  var password = req.body.password

  db.User.findOne({
    username: username
  }, function (err, data) {
    if (err) {
      throw err
    } else {
      if (!data) {
        res.sendStatus(404)
      } else {
        if (password === data.password) {
          help.createSession(req, res, data.username)
        } else {
          res.sendStatus(404)
        }
      }
    }
  })
})

app.post('/addTask', function (req, res) {
  var taskName = req.body.taskName
  var complete = req.body.complete
  var date = req.body.date

  var task = new db.Task({
    taskName: taskName,
    date:date,
    complete: complete,
    	username: req.session.user

  })
  task.save(function (err, data) {
    if (err) {
      throw err
    } else {
      res.sendStatus(201)
    }
  })
})

app.get('/tasks', function (req, res) {
  db.Task.find({username: req.session.user}, function (err, data) {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})

app.post('/deleteTask', function (req, res) {
  var id = req.body.id
  db.Task.findOneAndRemove({_id: id}, function (err, data) {
    if (err) {
      throw err
    } else {
      res.sendStatus(201)
    }
  })
})

app.post('/updateTask', function (req, res) {
  var id = req.body.id
  var newTask = req.body.newTask
  db.Task.findOneAndUpdate({_id: id}, {taskName: newTask}, function (err, data) {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})

app.post('/completedTask', function (req, res) {
  var id = req.body.id
  db.Task.findOneAndUpdate({_id: id}, {complete: true}, function (err, data) {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})

app.get('/logout', function (req, res) {
  req.session.destroy(function () {
    res.sendStatus(200)
  })
})

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '../react-client/dist/index.html')))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`this app is running on port ${PORT}`)
})

module.exports = app
