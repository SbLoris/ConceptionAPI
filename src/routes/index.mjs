import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const username = req.session.username || 'Invité';
  res.render('index', { title: 'Bienvenue', username });
});

export default router;
