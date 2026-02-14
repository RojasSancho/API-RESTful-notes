/*
 * First example of a basic web server (without framework)
 * Requires the installation of node.js 
 * 
 * Author: Hermes Rojas Sancho
 */

// require: Node function to import modules
// To access the module functions and create a server, we need to save 
// the content of 'http' module inside the constant called "http".
const http = require('http');

/* 
This is a callback function: it executes EVERY TIME a request arrives at the server
http.createServer: Returns a server object that is saved in the constant called "server".

-----------
Parameters
-----------
request: Object that contains the info of the client request
- Requested URL → request.url
- HTTP method   → request.method
- Sent headers  → request.headers

response: Object used by the server to respond to the client
For:
- Define headers
- Send data
- End the connection
*/
const server = http.createServer((request, response) => {
	/* Set the response header:
	Like a label that indicates to the client what type of content they are receiving.
	It's response type dependant.
	
	setHeader('Header-Name', 'value')
	
	Example values for Content-Type:
	- Simple text   → 'text/plain'
	- HTML content  → 'text/html'
	- An image      → 'image/png'
	- JSON content  → 'application/json' → Is needed to format the content using JSON.stringify({})
	*/ 
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
