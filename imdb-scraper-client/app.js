const form = document.querySelector('form');
const searchInput = document.querySelector('input');
const resultList = document.querySelector('#results');

const BASE_URL = 'http://localhost:3000/';


form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
    event.preventDefault();
    const searchTerm = searchInput.value;
    getSearchResults(searchTerm)
        .then(showResults);
}

function getSearchResults(movie) {

    return fetch(`${BASE_URL}search/${movie}`)
            .then(res => res.json())
};

function showResults(results) {    
    results.forEach(movie => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        li.appendChild(img);
        img.src = movie.image;
        const a = document.createElement('a');
        a.textContent = movie.title;
        a.href = './movie.html?imdbID=' + movie.imdbID;
        li.appendChild(a);
        resultList.appendChild(li);
    });

}
