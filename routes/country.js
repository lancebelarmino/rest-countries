const express = require('express');

const router = express.Router();

router.get('/:country', (req, res) => {
  const country = req.params.country;

  res.render('../views/country.ejs', { title: country });
});

module.exports = router;