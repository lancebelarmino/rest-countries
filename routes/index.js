const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('../views/index.ejs', { title: 'REST Countries' });
});

module.exports = router;