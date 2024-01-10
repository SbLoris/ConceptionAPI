import express from 'express';
const router = express.Router();


router.get('/chapitre', (req, res) => {
    const username = req.session.username || 'Invité';
    res.render('chapitre', { title: 'Chapitre', username });
  });
  
router.get('/chapitre/:numero', (req, res) => {
    const numeroChapitre = req.params.numero;
    res.send(`Chapitre numéro ${numeroChapitre}`);
  });
  
  


  export default router;