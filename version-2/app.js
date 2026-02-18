/*
 * Basic implementation of a client-server model using HTTP and Express
 * Demonstrates a simple REST API connected to a MongoDB database.
 * Requires Node.js and MongoDB running locally.
 * 
 * Lifecycle:
 * 1. The server connects to a MongoDB database
 * 2. A schema is defined to represent sensor documents.
 * 3. The server listens for incoming HTTP requests.
 * 4. When a client accesses '/datos', the database is queried.
 * 5. The results are returned in JSON format.
 * 
 * Author: Hermes Rojas Sancho
 */

// Import libraries
// express → creates the web server
// mongoose → enables communication with MongoDB using models
const express = require('express');
const mongoose = require('mongoose');

// This creates the HTTP server 
// Routes such as '/datos' are defined from this instance
const app = express();

// mongoose.connect('') → Connect to MongoDB
// If the database does not exist, MongoDB creates it automatically when data is inserted
mongoose.connect('mongodb://localhost:27017/telemetria_db');

// mongoose.Schema() → Define the data model (schema)
// Specifies how documents in the collection are structured
const SensorSchema = new mongoose.Schema({
	id_sensor: String,
	valor: Number,
	fecha: Date,
});
// mongoose.model() → Creates an ODM model for the MongoDB collection
// Sensor → interface used to query the "monitoreo_sensores" collection
const Sensor = mongoose.model('monitoreo_sensores', SensorSchema);

/*  
 * app.get(): Defines a GET endpoint
 * When a client accesses '/datos', the server:
 * 1. Retrieves all documents from MongoDB
 * 2. Sorts them by date in descending order [.sort({date: -1})]
 * 3. Returns the results in JSON format
*/  
app.get('/datos', async (request, response) => {
	const results = await Sensor.find().sort({fecha: -1});
	response.json(results);
});

// Starts the HTTP server and listens for incoming connections on port 4000
app.listen(4000, () => console.log('API with DB on port 4000'));
