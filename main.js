//search
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
});

// get movies card api
function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=42d77210&s=' + keyword)
    .then(response => response.json())
    .then(response => response.Search)
};

// card display
function updateUI(movies){
    let cards = "";
            movies.forEach(m => cards += showCards(m));
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = cards;
};



// event binding (grab button show movie detail ID)
document.addEventListener('click', async function(e) {
    if (e.target.classList.contains('modal-detail-button')){
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMoviesDetail(imdbid);
        updateUIDetail(movieDetail)
    }
});

//Get Movies Detail API
function getMoviesDetail(imdbid){
    return fetch('http://www.omdbapi.com/?apikey=42d77210&i=' + imdbid)
    .then(response => response.json())
    .then( m => m)
}

//modal Display
function updateUIDetail(m){
    const movieDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}
                 


// Cards
function showCards(m){
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-tp">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle m-2 textmuted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal"
                        data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Detail</a>
                    </div>
                </div>
            </div>`
}


// Modal Movie Detail
function showMovieDetail(m){
    return `<div class="container-fluid">
             <div class="row">
                 <div class="col-md-3">
                     <img src="${m.Poster}" class="img-fluid">
                 </div>
                 <div class="col-md">
                     <ul class="list-group">
                         <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
                         <li class="list-group-item"><strong>Sutradara : </strong>${m.Director}</li>
                         <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                         <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                         <li class="list-group-item"><strong>Plot : </strong><br>${m.Plot}</li>
                     </ul>
                 </div>
             </div>
         </div>`
}