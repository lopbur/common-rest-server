const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { port, whitelist, dbSync } = require('./server.setting');

const app = express();
const corsOptions = {
  origin: whitelist
}

app.use(cors(corsOptions))
-
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
const Role = db.role;

db.sequelize.sync(dbSync).then(() => {
  if (dbSync.force) {
    console.log('Drop and re-sync  db.');
    initial();
  }
});

app.get('/', (req, res) => {
  console.log('Response test message.');
  res.json({ message: 'Welcome to kapliff application.' });
});

// routes
require('./app/routes/tutorial.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/auth.routes')(app);

// set port, listen for request
const PORT = process.env.PORT || port || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const initial = () => {
  Role.create({
    id: 1,
    name: 'user'
  });

  Role.create({
    id: 2,
    name: 'moderator'
  });

  Role.create({
    id: 3,
    name: 'admin'
  })
}