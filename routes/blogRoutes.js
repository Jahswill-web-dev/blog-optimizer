const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/protected', protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!` });
});

module.exports = router;
