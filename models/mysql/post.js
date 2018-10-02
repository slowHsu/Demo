const Sequelize = require('sequelize');
const sequelize = require('./db').sequelize;
const Post = require('./db').Post;
/*
let Post = sequelize.define('Post', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  title: {type: Sequelize.STRING, allowNull: false},
  content: {type: Sequelize.TEXT, allowNull: true},
  author: {  type: Sequelize.INTEGER,
    references: {     // foreign key
      model: User,
      key: 'id'
    }
  }
}, {
    freezeTableName: true
});

Post.sync({ force: false });
*/

exports.addPost = function(title, content, author) {
    return Post.create({
        title: title,
        content: content,
        author_id: author
    });
};