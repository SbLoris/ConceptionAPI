import express from 'express';
const router = express.Router();

router.get('/Api', (req, res) => {
    const username = req.session.username || 'Invité';
    res.render('api', { title: 'Bienvenue', username });
  }); 
  
  
router.get('/Api/:id', (req, res) => {
    const username = req.session.username || 'Invité';
    res.render('api', { title: 'Bienvenue', username });
  });
  
  


export default router;
