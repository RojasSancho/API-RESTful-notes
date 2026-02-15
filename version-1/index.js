/*
 * Basic implementation of the client-server model using HTTP
 * First example of a basic web server using JavaScript (without framework)
 * Requires the installation of node.js 
 * 
 * Server lifecycle:
 * 1. Client sends HTTP request
 * 2. Node triggers callback
 * 3. Server sets headers
 * 4. Server sends response and closes the connection
 * 
 * Author: Hermes Rojas Sancho
 */

// require → Node function to import modules
// To access the module functions and create a server, we need to save 
// the content of 'http' module inside the constant called "http".
const http = require('http');

/* 
This is a callback function: it executes EVERY TIME an HTTP request arrives
http.createServer: Returns a server object that is saved in the constant called "server".
Node maintains an event loop listening for connections and executes the callback for each request.

-----------
Parameters
-----------
request → Object that contains the info of the client request
- Requested URL → request.url
- HTTP method   → request.method
- Sent headers  → request.headers

response → Object used by the server to respond to the client
For:
- Define headers
- Send data
- End the connection
*/
const server = http.createServer((request, response) => {
	/* Set the Response Header:
	Like a label that indicates to the client what type of content they are receiving.
	It describes the format of the response body. 
	Headers must be set before sending the response body.
	
	setHeader('Header-Name', 'value')
	
	Example values for Content-Type:
	- Simple text   → 'text/plain'
	- HTML content  → 'text/html'
	- An image      → 'image/png'
	- JSON content  → 'application/json' → JSON objects must be converted to string using JSON.stringify() because HTTP sends text or bytes
	*/ 
	response.setHeader('Content-Type', 'application/json');
	
	// request.url may include query parameters (e.g. /status?verbose=true)
	// === means STRICT equality (compare value and data type)
	if (request.url === '/status' && request.method === 'GET') {
		// Sets the HTTP status code (and can also send headers)
		response.writeHead(200); // OK status code / Success 
		
		// response.end → Sends the response to the client and ENDS the connection
		response.end(JSON.stringify({ 
			estado: "Servidor activo", 
			version: "1.0.0" 
		}));
	} else {
		// Default response for any route that is not explicitly handled
		response.writeHead(404); // Error status code / Server couldn't find the request resource
		response.end(JSON.stringify({ 
			error: "Recurso no encontrado" 
		}));
	}
});

// Starts the HTTP server and begins listening for incoming connections
server.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
