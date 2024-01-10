import fs from 'fs';
import express from 'express';
const router = express.Router();


router.get('/download', (req, res) => {
  const username = req.session.username || 'Invité';
  res.render('download', { title: 'Bienvenue', username });
});

router.get('/telecharger', (req, res) => {
  // Générer le nom de fichier
  const fileName = generateFileName();
  const filePath = `downloads/${fileName}`;

  // Écrivez le contenu du fichier avec la date dans le fichier
  fs.writeFile(filePath, new Date().toString(), (err) => {
    if (err) {
      console.error('Erreur lors de la création du fichier :', err);
      res.status(500).send('Erreur interne du serveur');
      return;
    }

    // Définissez les en-têtes pour le téléchargement
    res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-type', 'text/plain');

    // Créez un flux de lecture et envoyez le contenu du fichier au client
    const fileStream = fs.createReadStream(filePath);

    // Gestion d'erreur pour le cas où la réponse a déjà été envoyée
    fileStream.on('error', (err) => {
      console.error('Erreur lors de la lecture du fichier :', err);
      res.status(500).send('Erreur interne du serveur');
      return;
    });

    fileStream.pipe(res);

    // Vous pouvez également supprimer le fichier après l'envoi pour éviter de les accumuler
    fileStream.on('close', () => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Erreur lors de la suppression du fichier :', err);
        }
      });
    });
  });
});

// Fonction pour générer un nom de fichier unique
function generateFileName() {
  const now = new Date();
  const day = ('0' + now.getDate()).slice(-2);     // Ajoute un zéro devant le jour si nécessaire
  const month = ('0' + (now.getMonth() + 1)).slice(-2);  // Ajoute un zéro devant le mois si nécessaire
  const year = now.getFullYear();
  
  return `${day}-${month}-${year}.txt`;
}



export default router;
