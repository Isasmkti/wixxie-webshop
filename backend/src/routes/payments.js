const express = require('express');
const router = express.Router();

// Placeholder payments routes
router.post('/charge', (req, res) => {
  res.json({ message: 'Payments placeholder' });
});

module.exports = router;
