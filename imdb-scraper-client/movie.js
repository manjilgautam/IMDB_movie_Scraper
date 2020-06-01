const main = document.querySelector('main');
const imdbId = window.location.search.match(/imdbID=(.*)/)[1];
const BASE_URL = 'http://localhost:3000/';


function getMovie(imdbId) {
    return fetch(`${BASE_URL}movie/${imdbId}`)
        .then(res => res.json())
}


function showMovie(movie) {

    const section = document.createElement('section');
    main.appendChild(section);

    const t =  encodeURI(movie['trailer_link']);
    movie['trailer_link'] = t;

    const properties = [{
        title: 'Rating',
        property: 'rating'
    }, {
        title: 'Time',
        property: 'time'
    }, {
        title: 'Date Published',
        property: 'datePublished'
    }, {
        title: 'Summary',
        property: 'summary'
    }, {
        title: 'Story-line',
        property: 'storyLine'
    }, {
        title: 'Crews',
        property: '_crews'
    }, {
        title: 'Trailer',
        property: 'trailer_link'
    }
]

    const descriptionHTML = properties.reduce((html, property) => {
      html += 
            ` <dt class="col-sm-3">${property.title}</dt>
              <dd class="col-sm-9">${movie[property.property]}</dd> `;
        return html;
        }, '');


    section.outerHTML = `
        <section class = "row">
            <h1>${movie.title}</h1>
            <div class="col-sm-12">
                <img src="${movie.poster}" class="img-fluid"/>
            </div>
            <div class="col-sm-12">
            <dl class="row">
                ${descriptionHTML}
          </dl>
        </div>
    </section>
    `;
}

getMovie(imdbId)
    .then(showMovie);

