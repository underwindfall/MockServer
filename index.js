const Server = require('./src/server.js');
const port = 3000;


const server = new Server(port);
server.start();
