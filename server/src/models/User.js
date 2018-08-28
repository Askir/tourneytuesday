const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

function hashPassword(user) {
  const SALT_FACTOR = 8;
  if (!user.changed('password')) {
    return null;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then((hash) => {
      console.log(hash);
      user.setDataValue('password', hash);
    });
}
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      beforeSave: hashPassword,
    },
  });

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password);
  };

  User.prototype.toJSON = function toJson() {
    const values = Object.assign({}, this.get());  
    delete values.password;
    return values;
  };
  return User;
};
