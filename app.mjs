import express from 'express';
import session from 'express-session';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { Sequelize } from 'sequelize';
import apiRoutes from './src/routes/api.mjs';
import chapitreRoutes from './src/routes/chapitre.mjs';
import chatRoutes from './src/routes/chat.mjs';
import downloadRoutes from './src/routes/download.mjs';
import indexRoutes from './src/routes/index.mjs';
import loginRoutes from './src/routes/login.mjs';




const app = express();
const port = 8080;
const server = createServer(app);
const io = new Server(server);

const sequelize = new Sequelize('liveAddict', 'root', 'rootpwd', {
  host: 'localhost',   // Utilisez 'localhost' si vous exécutez le conteneur sur votre machine
  port: '4000',        // Le port mappé pour MariaDB dans docker-compose
  dialect: 'mariadb'
});


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use('/api', apiRoutes);
app.use('/chapitre', chapitreRoutes);
app.use('/chat', chatRoutes);
app.use('/download', downloadRoutes);
app.use('/', indexRoutes);
app.use('/login', loginRoutes);

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

app.use((req, res, next) =>  {
  res.locals.loginComponent = 'login';
  res.locals.disconnectComponent = 'disconnect';
  res.locals.navbarComponent = 'navbar';
  res.locals.layout = 'layout';
  res.locals.downloadComponent = 'download';
  res.locals.username = req.session.username || 'Invité';
  res.locals.isAdmin = req.session.username === 'admin';
  next();
});
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

app.set('view engine', 'ejs');

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});


app.use((req, res) => {
  const username = req.session.username || 'Invité';
  res.status(404).render('404', { title: 'Page Not Found', username });
  console.log('pageNotFound');
});

app.use((req, res) => {
  const username = req.session.username || 'Invité';
  res.render('404', { title: 'Page Not Found', username });
  console.log('pageNotFound');
});

server.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port} lien vers le site : http://localhost:${port}`);
});

export default sequelize;