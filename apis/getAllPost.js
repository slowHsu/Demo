const getUserPost = require('../models/mysql/post').getUserPost;

async function getAllPost(req, res) {
  console.debug('get GET request: getAllPost');

  //Check req is valid or not
  if (!/^[0-9]+$/i.test(req.body.userId)) {
    console.info(`[getAllPost] Illegal character: ${req.body.userId}`)
    res.status(400).json({ error: true, message: 'Illegal character. userId: ' + req.body.userId });
  } else {
    try {
      let posts = await getUserPost(req.body);
      console.debug(posts);
      res.status(200).json({ success: true, message: 'Success', posts: posts });
    } catch (err) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

module.exports = getAllPost;