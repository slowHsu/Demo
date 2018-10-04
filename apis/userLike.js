const addLikePost = require('../models/mysql/like').addLikePost;

function userLike(req, res) {
  console.debug('get POST request: userLike');
  let like = {
    userId,
    postId
  } = req.body;

  //Check req is valid or not
  if (!/^[0-9]+$/i.test(like.userId) || !/^[0-9]+$/i.test(like.postId)) {
    let illegal = (!/^[0-9]+$/i.test(like.userId)) ? `userId: ${like.userId}` : `postId: ${like.userId}`;
    console.info(`[userPost] Illegal character: ${illegal}`)
    res.status(400).json({ error: true, message: 'Illegal character. ' + illegal });
  } else {
    addLikePost(like, (err, id) => {
      if (err) {
        if (err === 'ForeignKeyConstraintError') {
          console.info(`[userLike] ForeignKeyConstraintError: ${id}`);
          let msg = (id === 'post') ? `Invalid postId: ${like.postId}` : `Invalid userId: ${like.userId}`
          return res.status(400).json({ error: true, message: msg });
        } else if (err === 'Duplicate') {
          console.info(`[userLike] Duplicate Like.`)
          return res.status(400).json({ success: true, message: 'Duplicate like.', id: id });
        }
        console.error(err);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
      }
      console.info(`[userLike] Success: ${like}`);
      res.status(200).json({ success: true, message: 'Success.', id: id });
    })
  }
}

module.exports = userLike;