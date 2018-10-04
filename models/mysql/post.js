const Sequelize = require('sequelize');
const sequelize = require('./db').sequelize;
const Post = require('./db').Post;

exports.addPost = function (post, callback) {
  return Post.create({
    title: post.title,
    content: post.content,
    author_id: post.userId
  })
    .then(post => {
      return callback(null, post.id);
    })
    .catch(Sequelize.ForeignKeyConstraintError, (err) => {
      console.warn('[models/post] ForeignKeyConstraintError');
      return callback('ForeignKeyConstraintError');
    })
    .catch(err => {
      return callback(err);
    });
};