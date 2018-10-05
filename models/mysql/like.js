const Sequelize = require('sequelize');
const sequelize = require('./db').sequelize;
const Like = require('./db').Like;
const User = require('./db').User;

exports.addLikePost = function (like, callback) {
  sequelize.transaction(function (t) { //start transaction
    return Like.findOrCreate({  //Check if duplicate or not
      where: {
        user_id: like.userId,
        post_id: like.postId
      },
      transaction: t
    })
      .spread((like, created) => {
        return (created) ? callback(null, like.id) : callback('Duplicate', like.id);
      })
      .catch(Sequelize.ForeignKeyConstraintError, (err) => { // error handling
        console.warn('[models/like] ForeignKeyConstraintError');
        return callback('ForeignKeyConstraintError', err.table);
      })
      .catch(err => {
        return callback(err);
      });
  })
};


exports.getPostLike = function (postId, callback) {
  console.log(postId)
  return new Promise((resolve, reject) => {
    Like.findAll({
      where: { post_id: postId },
      attributes: [],
      include: [{
        model: User,
        attributes: ['name', 'name'],

      }]
    })
      .then(like => {
        resolve(like);
      })
      .catch(err => {
        console.error(err)
        reject(err);
      })
  });
};