const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/telemetria_db');

const SensorSchema = new mongoose.Schema({
	id_sensor: String,
	valor: Number,
	fecha: Date,
});
const Sensor = mongoose.model('monitoreo_sensores', SensorSchema);

app.get('/datos', async (request, response) => {
	const results = await Sensor.find().sort({fecha: -s1});
	response.json(results);
});

app.listen(4000, () => console.log('API with DB on port 4000'));
