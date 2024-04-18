
const request = require('request');


function getMovieCharacters(movieId) {
    const url = `https://swapi-api.alx-tools.com/api/films/${movieId}`;
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const characters = data['characters'];
            characters.forEach(characterUrl => {
                request(characterUrl, (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        const characterData = JSON.parse(body);
                        console.log(characterData['name']);
                    } else {
                        console.log(`Impossible de récupérer les données pour le personnage à partir de l'URL : ${characterUrl}`);
                    }
                });
            });
        } else {
            console.log("Impossible de récupérer les données du film.");
        }
    });
}

const movieId = process.argv[2];
if (!movieId) {
    console.log("Utilisation : node script.js <ID du film>");
} else {
    getMovieCharacters(movieId);
}