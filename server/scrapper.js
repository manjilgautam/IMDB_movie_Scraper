fs = require('fs');
const fetch = require('node-fetch');
const cherio = require('cheerio');

const searchURL = 'https://www.imdb.com/find?&ref_=nv_sr_sm&q=';
const movieURL = 'https://www.imdb.com/title/';

// const tex = fs.readFileSync('./index.html', 'utf-8');
// const $ = cherio.load(tex);
// console.log($('#fruits').find('li').length);

// Used for cahcing to avoid multiple request to imdb site

const movieCache = {};
const SearchCache = {};

function searchMovies(searchTerm) {
    
    if(SearchCache[searchTerm]) {
        console.log('Serving from cache...', searchTerm);
        return Promise.resolve(SearchCache[searchTerm]);
    }
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
            SearchCache[searchTerm] = movies;
            return movies;
        });
}

function getMovies(imdbId) {

    if(movieCache[imdbId]) {
        console.log('Serving from cache...', imdbId);
        return Promise.resolve(movieCache[imdbId]);
    }

    return fetch(`${movieURL}${imdbId}`)
        .then(response => response.text())
        .then(body => {
            const $ = cherio.load(body);
            const $title = $('.title_wrapper h1');
            const rating = $('div.subtext').children().remove().end().text().replace(/\n/g, '').replace(/,/g,'').trim();
            const time = $('time').text();
            const imdbRating = $('span[itemProp="ratingValue"]').text();
            const poster = $('div.poster a img').attr('src')
            const genre = ['Dummy', 'Dummy', "Dummy"];
            const datePublished = "00-00-0000";
            const summary = $('div.summary_text').text().trim();
            const crews = $('div.credit_summary_item').text().trim().replace(/\n/g, '').replace(/,/g,'').trim();
            const _crews = crews.substring(0, crews.length - 34);

            const rawStory = $('#titleStoryLine div').text().trim();

            const index_of = rawStory.indexOf('\n');
            const storyLine =  rawStory.substring(0,index_of);

            const company = "Progress...";

            const trailer_link = $('div.slate a').attr('href');
            
            
            


            // const dirs = []

            // $('div.credit_summary_item').each(function(i, element) {
            //     const director = $(element).text().trim();

            //     console.log('The first one is: ', director);
            
            // });


           // const content = $('.subtext a').text();
           // console.log('The content is: ', content);

        //    const sumary = $('div.credit_summary_item a').text();
        //    console.log(sumary);
        //     const crewMember = []
        //    $('div.credit_summary_item a').each(function(i, element) {
        //        const director = $(element).text().trim();
        //        console.log('This is a ', director);
        //    })
           


            
            const title = $title.first().contents().filter(function() {
                return this.type === 'text';
            }).text().trim();

            const movie = {
                imdbId,
                title,
                rating,
                time,
                genre,
                datePublished,
                imdbRating,
                poster,
                summary,
                _crews,
                storyLine,
                company,
                trailer_link: `https://www.imdb.com/${trailer_link}` 
            };
            movieCache[imdbId] = movie;
            return movie;
        });
};

module.exports = {
    searchMovies,
    getMovies
}



