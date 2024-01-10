import express from 'express';
const router = express.Router();

router.get('/Chat', (req, res) => {
    const username = req.session.username || 'Invité';
    const messages = []; 
    res.render('chat', { title: 'Chat', username, messages });
  });

  export default router;