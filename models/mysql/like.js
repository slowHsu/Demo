const Sequelize = require('sequelize');
const sequelize = require('./db').sequelize;
const Like = require('./db').Like;

exports.addLikePost = function (like, callback) {
    sequelize.transaction(function (t) {
      return Like.findOrCreate({
        where: {
          user_id: like.userId,
          post_id: like.postId
        },
        transaction: t
      })
        .spread((like, created) => {
          return (created) ? callback(null, like.id) : callback('Duplicate', like.id);
        })
        .catch(Sequelize.ForeignKeyConstraintError, (err) => {
            console.warn('[models/like] ForeignKeyConstraintError');
            return callback('ForeignKeyConstraintError', err.table);
        })
        .catch(err => {
          return callback(err);
        });
    })
  };