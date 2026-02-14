/*
 * First example of a basic web server (without framework)
 * Requires the installation of node.js 
 * 
 * Author: Hermes Rojas Sancho
 */

const http = require('http');

const server = http.createServer((request, response) => {
	// Set the response header
	response.setHeader('Content-Type', 'application/json');
	
	if (request.url === '/status' && request.method === 'GET') {
		response.writeHead(200); // OK CODE / Success 
		response.end(JSON.stringify({ estado: "Servidor activo", version: "1.0.0" }));
	} else {
		response.writeHead(404); // Error code / Server couldn't find the request resource
		response.end(JSON.stringify({ error: "Recurso no encontrado" }));
	}
});

server.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
