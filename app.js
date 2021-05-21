const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
const user = require('./controllers/usercontroller');
const validateSession = require('./middleware/validate-session');
const game = require('./controllers/gamecontroller')

const PORT = Number(process.env.PORT);
const app = express();

db.sync()
  .then(result => { console.log(result); })
  .catch(e => { console.error(e) });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', user);
app.use(validateSession);
app.use('/api/game', game);

app.listen(PORT,function() {
    console.log("App is listening on 4000");
});
