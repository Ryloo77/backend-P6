// on importe le package http nafit de node
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
  const port = normalizePort(process.env.PORT || '3000');
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
  //céation d'un écouteur d'évènements , consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console
  const server = http.createServer(app);
  
  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });
  
  server.listen(port);
/* ----------- fin amélioration proposée dans le cours-----------*/


/* code avant l'amélioration proposé dans le cours */
// // On dit à l'application express sur que port on va tourner 
// app.set('port', process.env.PORT || 3000);
// // on va passer à notre server cette application
// const server = http.createServer(app);
// //On configure le serveur pour qu'il écoute :
// // soit la variable d'environnement du port grâce à "process.env.PORT" si la variable environnement propose un port par defaut
// // soit le port 3000, ce qui nous servira dans notre plateforme de developpement
// server.listen(process.env.PORT || 3000);