const addPost = require('../models/mysql/post').addPost;

function userPost(req, res) {
  console.debug('get POST request: userPost');
  let post = {
    userId,
    title,
    content
  } = req.body;

  //Check req is valid or not
  if (!/^[0-9]+$/i.test(post.userId) || !/^[a-zA-Z0-9 ]+$/i.test(post.title)) {
    console.info(`[userPost] Illegal character: ${userId} or ${title}`)
    let illegal = (!/^[0-9]+$/i.test(post.userId)) ? `userId: ${post.userId}` : `title: ${post.title}`;
    res.status(400).json({ error: true, message: 'Illegal character. ' + illegal });
  } else {
    addPost(post, (err, id) => {
      if (err) {
        if (err === 'ForeignKeyConstraintError') {
          console.info(`[userPost] ForeignKeyConstraintError: ${post.userId}`)
          return res.status(400).json({ error: true, message: 'Invalid userId: ' + post.userId });
        }
        console.error(err);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
      }
      console.info(`[userPost] Success: ${post.title}`);
      res.status(200).json({ success: true, message: 'Success post:' + post.title, id: id });
    })
  }
}

module.exports = userPost;