const express = require('express');
const Scraper = require('./scrapper');
const cors = require('cors');


const app = express();
app.use(cors());


app.get('/', (req, res) => {
    res.json({
        message: '🍿 Movie-Scraper 🎬'
    });
})

app.get('/search/:title', (req, res) => {
    Scraper.searchMovies(req.params.title)
        .then(movie => {
            res.json(movie);
        });
});

app.get('/movie/:imdbID', (req, res) => {
    Scraper.getMovies(req.params.imdbID)
        .then(movie => {
            res.json(movie);
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port} .`);
});
