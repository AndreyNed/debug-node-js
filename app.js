var express = require('express');
const bodyParser = require('body-parser');

var db = require('./db');
var user = require('./controllers/usercontroller');
const validateSession = require('./middleware/validate-session');
var game = require('./controllers/gamecontroller')

const PORT = Number(process.env.PORT);
var app = express();

db.sync();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', user);
app.use(validateSession);
app.use('/api/game', game);

app.all('/', (req, res) => { res.send('Hello!'); });

app.listen(PORT,function() {
    console.log("App is listening on 4000");
});
