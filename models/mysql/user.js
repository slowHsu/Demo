const Sequelize = require('sequelize');
const sequelize = require('./db').sequelize;
const User = require('./db').User;
const Like = require('./db').Like;

exports.addUser = function (userName, callback) {
  sequelize.transaction(function (t) {
    return User.findOrCreate({
      where: {
        name: userName,
      },
      transaction: t
    })
      .spread((user, created) => {
        return (created) ? callback(null, user.id) : callback('Duplicate', user.id);
      })
      .catch(err => {
        return callback(err);
      });
  })
};