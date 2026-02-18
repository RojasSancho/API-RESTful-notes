/*
 * Example REST API with Express and MongoDB
 *
 * Notes for beginners:
 * - Node.js → JavaScript runtime that allows you to run JS code on your computer/server.
 * - Express → Library to create a web server and define endpoints (routes).
 * - MongoDB → NoSQL database to store documents (JSON-like objects).
 * - Mongoose → Library to interact with MongoDB using JavaScript objects (ODM).
 *
 * Workflow of this API:
 * 1. Connect to the MongoDB database 'telemetria_db'.
 * 2. Define a Schema to specify how a sensor document looks.
 * 3. Create a Model (Sensor) to query and interact with the collection 'monitoreo_sensores'.
 * 4. Define a GET endpoint '/datos':
 *    a) Fetches all documents from the collection.
 *    b) Sorts them by 'fecha' descending (newest first).
 *    c) Returns the results in JSON format.
 * 5. Start the server on port 4000 and wait for requests.
 *
 * Author: Hermes Rojas Sancho
 */

// --------------- IMPORT LIBRARIES -----------------
// express → used to create the HTTP server and define routes
// mongoose → allows us to define schemas and models to work with MongoDB
const express = require('express');
const mongoose = require('mongoose');

// --------------- CREATE SERVER -----------------
// Create an Express app instance; this is your HTTP server
// All routes (like '/datos') are defined from this object
const app = express();

// --------------- CONNECT TO MONGODB -----------------
// mongoose.connect() → Connects to a MongoDB database
// If the database does not exist, MongoDB creates it automatically
mongoose.connect('mongodb://localhost:27017/telemetria_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// --------------- DEFINE SCHEMA -----------------
// Schema → defines the structure of documents in a collection
// Each document represents a sensor reading
const SensorSchema = new mongoose.Schema({
	id_sensor: String, // ID of the sensor
	valor: Number,     // Value recorded by the sensor
	fecha: Date,       // Timestamp of the reading
});

// --------------- CREATE MODEL -----------------
// Model → interface to query the 'monitoreo_sensores' collection
// Using the SensorSchema defined above
const Sensor = mongoose.model('monitoreo_sensores', SensorSchema);

// --------------- DEFINE ENDPOINT -----------------
// GET '/datos' → When someone visits this URL, the server executes this function
app.get('/datos', async (request, response) => {
	try {
		// Sensor.find() → fetch all documents
		// .sort({fecha: -1}) → sort by 'fecha' descending (most recent first)
		const results = await Sensor.find().sort({fecha: -1});
		
		// response.json() → return results in JSON format
		response.json(results);
	} catch (err) {
		// If something goes wrong, send an error message
		response.status(500).json({ error: 'Internal Server Error', details: err.message });
	}
});

// --------------- START SERVER -----------------
// app.listen(port) → starts the server and waits for HTTP requests
app.listen(4000, () => console.log('API with DB running on port 4000'));

