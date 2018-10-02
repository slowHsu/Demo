const Sequelize = require('sequelize');
const sequelize = require('./db').sequelize;
const User = require('./db').User;
/*
let User = sequelize.define('User', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING, unique: true, allowNull: false}
}, {
    freezeTableName: true
});

User.sync({ force: false });
*/

exports.addUser = function(userName,) {
    return User.create({
        name: userName
    });
};