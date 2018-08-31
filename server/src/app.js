const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const { sequelize, User } = require('./models');

const app = express();

app.use(morgan('combine'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

sequelize.sync()
  .then(() => {
    const admin = User.findOne({ where: { username: 'Lancemenot' } });
    if (!admin) {
      User.create({
        username: 'Lancemenot',
        password: 'LILorvyovZagNa6',
      });
    }
    app.listen(config.port);
    console.log(`Server started on Port ${config.port}`);
  });
