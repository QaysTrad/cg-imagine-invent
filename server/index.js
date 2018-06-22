let express = require('express') 
let path = require('path') 
let db = require('../database/index') 

const app = express() 

app.use(express.static(path.join(__dirname, '../react-client/dist'))) 

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '../react-client/dist/index.html')))
}) 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`this app is running on port ${ PORT }`);
});

module.exports = app