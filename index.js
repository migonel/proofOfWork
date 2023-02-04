const http = require("http"); //Import Http module
const hostname = "localhost";
const port = 3000;
const Block = require("./block");

const myBlock = new Block(0, "Transacciones",1);
const myBlockString = JSON.stringify(myBlock);

const server = http.createServer((req, res) => {
 console.log(req.headers); //show details on console when starting server
 res.statusCode = 200; // used to send back status code
 res.end(`<html><body><h1>My Block:</h1><p>${myBlockString}</p></body></html>`); // used to end the response
})
server.listen(port, hostname); // create a server that listens at port 3000 on your pc