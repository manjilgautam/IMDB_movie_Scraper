### Scrape-imdb using Node.js and Cherios

### Server-side

* [x] Tools used(npm-packages):
    * Express, cors, cherios 
    * Listens on port 3000 
* [x] ``` '/search/:title ```
    * Returns: Movie title, imdbId, and image of that Movie
* [x] ```'/movie/:imdbID'````
    * Returns imdbId,title,rating,
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
    