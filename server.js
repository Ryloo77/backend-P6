/* ----   création du code pour le serveur node ----*/
// on importe le package http de node qui permet de créer un server
const http = require('http');
// on importe  l'application express qui avec été configuré en export dans l'appli (app.js)
const app = require('./app')
/* ----------- Début amélioration proposée dans le cours-----------*/
//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  //on défini le port du serveur à écouter avec la constant port avec par defaut le port 3000
  const port = normalizePort(process.env.PORT || '3000');
  //on dit a l'appli express sur quel port elle doit tourner
  app.set('port', port);
  //la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur 
  const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  //On appelle la methode CreatServer du package http qui prend comme argument la fonction (app) appelé à chaque requête reçu par le serveur
  const server = http.createServer(app);
  
  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });
  // on écoute les requête envoyé par le server avec la methode listen du serveur avec le port a écouter
  server.listen(port);
