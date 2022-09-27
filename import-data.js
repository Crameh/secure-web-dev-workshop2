require('dotenv').config();
import mongoose from 'mongoose';
const { Schema } = mongoose;

const filmSchema = new Schema({
    "filmType": String,
    "filmProducerName": String,
    "endDate": Date,
    "filmName": String,
    "district": String,
    "geolocation": {
        "coordinates": [String],
        "type": String
    },
    "sourceLocationId": String,
    "filmDirectorName": String,
    "address": String,
    "startDate": Date,
    "year": "2020",
})