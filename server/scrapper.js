fs = require('fs');
const fetch = require('node-fetch');
const cherio = require('cheerio');

const searchURL = 'https://www.imdb.com/find?&ref_=nv_sr_sm&q=';
const movieURL = 'https://www.imdb.com/title/';

// const tex = fs.readFileSync('./index.html', 'utf-8');
// const $ = cherio.load(tex);
// console.log($('#fruits').find('li').length);


function searchMovies(searchTerm) {
    return fetch(`${searchURL}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const $ = cherio.load(body);
            const movies = [];
            const findResult = $('.findResult');
            findResult.each(function(index, element) {
                const $element = $(element);
                const $image = $element.find('td a img');
                const $title = $element.find('td.result_text a');
                if($title.attr('href').match(/title\/(.*)\//)) {
                    const imdbID = $title.attr('href').match(/title\/(.*)\//)[1];
                    const movie = {
                        image: $image.attr('src'),
                        title: $title.text(),
                        imdbID
                    };
                    movies.push(movie);
                }
            });

            return movies;
        });
}

function getMovies(imdbId) {
    return fetch(`${movieURL}${imdbId}`)
        .then(response => response.text())
        .then(body => {
            const $ = cherio.load(body);
            const $title = $('.title_wrapper h1');
            const $rating = $('.title_wrapper').find('.subtext');
            
            console.log($rating.text());
            
            const title = $title.first().contents().filter(function() {
                return this.type === 'text';
            }).text().trim();

            return {
                title,
            };
        });
};

module.exports = {
    searchMovies,
    getMovies
}



