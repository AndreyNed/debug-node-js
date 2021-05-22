const express = require('express');
const { urlencoded, json } = require('body-parser');

require('./db');

const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')

const PORT = Number(process.env.PORT);
const app = express();


db.sync().then(() => { console.log('Database is synchronized'); });
app.use(urlencoded({ extended: true }));
app.use(json());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);

app.listen(PORT, () => {
  console.log(`App is listening on ${ PORT }`);
});
