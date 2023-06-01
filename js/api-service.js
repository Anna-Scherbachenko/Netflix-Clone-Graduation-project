// -  export
export default class ApiService {
    constructor() {
        this.baseUrl = 'https://api.themoviedb.org/3';
        this.key = '00b8de35a2cfbebd9c5ce1d891aea463';
        this.searchQuery = '';
        this.page = 1;
        this.lang = 'uk-UA';
    };

    getPopular() {
        return this.sendRequest(`${this.baseUrl}/movie/popular?api_key=${this.key}&language=${this.lang}&page=${this.page}`);
    };
    getGenres() {
        return this.sendRequest(`${this.baseUrl}/genre/movie/list?api_key=${this.key}&language=${this.lang}`);
    };
    //single
    getMovieById(movieId) {
        return this.sendRequest(`${this.baseUrl}/movie/${movieId}?api_key=${this.key}&language=${this.lang}`);
    };

    getMoviesByKeyWords(keyWords) {
        this.searchQuery = encodeURIComponent(keyWords);
         return this.sendRequest(`${this.baseUrl}/search/movie?api_key=${this.key}&query=${keyWords}&language=${this.lang}&page=1`);
    };


    //utils
    sendRequest(url) {
        return fetch(url)
            .then((res) => this.checkResponse(res))
            .then((data) => data)
            .catch((err) => {
                console.log('fetch: catch error: ', err.message);
            })
    };

    checkResponse(res) {
        if (res.status >= 400) {
            throw new Error('Something went wrong!');
        } else {
            return res.json();
        }
    };
};