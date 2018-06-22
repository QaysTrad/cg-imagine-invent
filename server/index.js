let express = require('express') 
let path = require('path') 
let db = require('../database/index') 
let bodyParser = require('body-parser');

const app = express() 
app.use(express.static(path.join(__dirname, '../react-client/dist'))) 
app.use(bodyParser.json());


app.post('/signup' , function (req , res) {
  var username = req.body.username; 
  var password = req.body.password; 
  var email = req.body.email; 

  db.User.find({username : username}, function (err , data) {
  	if (err) {
  		res.sendStatus(404) 
  	}else{
  		var user = new db.User({
              username: username,
              email: email,
              password: password
            }) 
            user.save(function (err, data) {
              if (err) {
                throw err
              }
 			})
  		}
  })
})

app.post('/login' , function (req , res) {
	var username = req.body.username;
	var password = req.body.password;

	db.User.findOne({
		username : username
	},function (err , data) {
		if (err){
			throw err ;
		}else{
			if(!data){
				res.sendStatus(404);
			}else{
				if(password === data.password){
				console.log("done" , data);
				res.sendStatus(202);
				}else{
					res.sendStatus(404);
				}
			}
		}
	})
})

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '../react-client/dist/index.html')))
}) 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`this app is running on port ${ PORT }`);
});

module.exports = app