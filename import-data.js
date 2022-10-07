require('dotenv').config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

const filmSchema = new Schema({
    "filmType": String,
    "filmProducerName": String,
    "endDate": Date,
    "filmName": String,
    "district": String,
    "geolocation": {
        "coordinates": [Number],
        "type": {
            "type": String,
            "enum" : ['Point']
        }
    },
    "sourceLocationId": String,
    "filmDirectorName": String,
    "address": String,
    "startDate": Date,
    "year": Number
})

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected !');

    //await import_locations();
    //console.log('done ! ')
}

const filmingLocations = require('./lieux-de-tournage-a-paris.json')
const Location = mongoose.model("Location", filmSchema);

async function import_locations() {
    filmingLocations.forEach(film => {
        let location = new Location({
            filmType : film.fields.type_tournage,
            filmProducerName: film.fields.nom_producteur,
            endDate: new Date(film.fields.date_fin),
            filmName: film.fields.nom_tournage,
            district: film.fields.ardt_lieu,
            geolocation: film.fields.geo_shape,
            sourceLocationId: film.fields.id_lieu,
            filmDirectorName: film.fields.nom_realisateur,
            address: film.fields.adresse_lieu,
            startDate: new Date(film.fields.date_debut),
            year: parseInt(film.fields.annee_tournage)
        });
        location.save();
    })
}

function queryById(id) {
    Location.findById(id).then(film => console.log(film))
}

function queryAllByFilmName(nameOfFilm) {
    return Location.find({filmName : nameOfFilm}).then(films => films.forEach(film => console.log(film)))
}

function deleteById(id) {
    Location.findOneAndDelete({_id:id}).then(console.log('Deleted !')) // ca marche pas
}

function addLocation(location) {
    try{
        location.save();
    } catch (e) {
        console.log("Something went wrong !")
    }
}

function updateLocation(id, changes) {
    Location.updateOne(queryById(id), changes);
}

main();

//queryById('633f20c37a5389e1dda7f845')
//deleteById('633f20c37a5389e1dda7f845')
//queryAllByFilmName('Ca ne va pas Supermarché')
//let test = new Location({filmName : "Marc le Dieu tout puissant !"});
//addLocation(test);
//console.log(queryAllByFilmName("Marc le Dieu tout puissant !"));
changes = {filmProducerName : "Marc est vraiment tout puissant ! Mouhahahaha"};
updateLocation("634049a41b49f4c0d2d9b377", changes);
queryById("634049a41b49f4c0d2d9b377")