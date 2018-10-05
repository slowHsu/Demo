const getPostLike = require('../models/mysql/like').getPostLike;

async function getAllLike(req, res) {
  console.debug('get GET request: getAllLike');

  //Check req is valid or not
  if (!/^[0-9]+$/i.test(req.body.postId)) {
    console.info(`[getAllLike] Illegal character: ${req.body.postId}`)
    res.status(400).json({ error: true, message: 'Illegal character. postId: ' + req.body.postId });
  } else {
    try {
      let likes = await getPostLike(req.body.postId);
      let like = [];

      likes.forEach(e => {
        like.push(e.User)
      });

      res.status(200).json({ success: true, message: 'Success', likes: like });
    } catch (err) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

module.exports = getAllLike;