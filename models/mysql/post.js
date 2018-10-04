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

exports.getUserPost = function (info, callback) {
  console.log(info)
  return new Promise((resolve, reject) => {
    if (!info.postId) {
      Post.findAll({
        where: { author_id: info.userId },
        attributes: [['id', 'postId'], 'title', 'content']
      })
        .then(post => {
          resolve(post);
        })
        .catch(err => {
          console.error(err)
          reject(err);
        })
    } else {
      //TODO: get a post detail info
      reject('not provide this function..')
    }
  });
};

