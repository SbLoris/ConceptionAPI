import express from 'express';
const router = express.Router();

router.get('/Login', (req, res) => {
    const username = req.session.username || 'Invité';
    res.render('login', { title: 'Login', username });
  });
  
router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (username === 'admin' && password === 'admin') {
      req.session.username = username;
      console.log('Session username set to:', username);
    }
  
    res.redirect('/');
  });
  router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Erreur lors de la déconnexion:', err);
      } else {
        res.redirect('/');
      }
    });
  });

  export default router;
