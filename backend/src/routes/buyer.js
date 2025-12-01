const express = require('express');
const router = express.Router();

// Placeholder buyer routes
router.get('/', (req, res) => {
  res.json({ message: 'Buyer route placeholder' });
});

module.exports = router;
