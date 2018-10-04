const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.status(200).json({success:true, message:'Hello! This is a demo project.'})
});

router.post('/user', require('../apis/createUser'));
router.post('/user/post', require('../apis/userPost'));

module.exports = router;