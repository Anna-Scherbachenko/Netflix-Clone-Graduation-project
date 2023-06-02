// - imports
import debounce from 'lodash.debounce';

import ApiService from './api-service';
import { moviesAll } from './movies-all';
import { movieSingle } from './movie-single';
import openModalWindow from './modal';
import './loading';


//refs 
const moviesList = document.querySelector('.list');
const modalWindow = document.querySelector('[data-modal]');
const searchInput = document.querySelector('#search-input');
const invalidFeedback = document.querySelector('.header-search__warning');


function addGenres(movies, genres) {
    //кожен фільм окремо
    // {}- деструктуризація - дістаємо властивість з об'єкту; й ...otherProps - інші властивості (але без genre_ids(повертає числа)) тобто ми забираємо жанри з колекції movies
    return movies.map(({ genre_ids, ...otherProps }) => {
        // console.log(movies);
        //витягуємо з чисел genre_ids - назви жанрів словами (перезбираємо genre_ids)
        const genre_names = genre_ids.map((genreId) => {
            //перебираємо усі жанри за допомогою методу find (шукаємо співпадіння id та повертаємо назву, яка їм належить)
            return genres.find(({ id }) => genreId === id).name;
        });
        //повертаємо жанри у колекцію movies але вже не як числа, а як назви
        return {...otherProps, genre_names};
    });
};


function renderMovies(arr) {
    // вивід в HTML
   moviesList.innerHTML = moviesAll(arr);
};

//відображення інформації про обраний фільм в модальному вікні.
async function renderMovieInfo(movieId) {
    // console.log('movieId: ', movieId);
    
    //Використання ключового слова await виконується в контексті асинхронної функції, що дозволяє призупинити виконання функції до отримання результату від api.getMovieById(movieId).
    const result = await api.getMovieById(movieId);
    //дані передаються функції movieSingle, яка відповідає за форматування інформації про фільм у відповідному вигляді. Результат виконання функції movieSingle потім додається до вмісту модального вікна з допомогою властивості innerHTML.
    modalWindow.innerHTML = movieSingle(result);
};

//відповідає за обробку кліку на зображенні фільму, яке міститься в елементі з класом list-item__img. Функція onMovieClick викликається, коли сталася подія click на елементі з списку фільмів.
function onMovieClick(e) {
    if (!e.target.classList.contains('list-item__img')) return;
    //коли користувач клікає на зображенні фільму, викликаються дві функції, які відповідають за відображення модального вікна та заповнення інформацією про фільм.
    openModalWindow();
    renderMovieInfo(e.target.dataset.id);
};

function onSearchInput(e) {
    //відправляємо запит на api, коли написано від 2 символів у пошуку
    //якщо довжина в інпуті більше 2 символів
    if (e.target.value.length > 2) {
        //ховаємо елемент з фідбеком, який відображає повідомлення про помилку.
        invalidFeedback.classList.add('visually-hidden');
        //Викликається метод Promise.all(), який приймає два параметри - один для отримання фільмів за ключовим словом, введеним користувачем, і другий для отримання жанрів.
        Promise.all([api.getMoviesByKeyWords(e.target.value), api.getGenres()])
            //після виконання обіцянок виконується метод then(), який отримує масив з двох об'єктів, які містять відповідно масив з фільмами та масив з жанрами.
            .then(([{ results: movies }, { genres }]) => {
                //Далі перевіряється, чи є відповідь від сервера - масив фільмів не повинен бути порожнім. Якщо відповідь є, то викликається функція addGenres, яка додає до кожного фільму властивість genres зі списком жанрів, які відповідають цьому фільму.
                if (movies.length > 0) {
                    return addGenres(movies, genres);   
                };
                //Якщо масив фільмів порожній, то викликається помилка з повідомленням 'Empty results'.
                throw new Error('Empty results');
            })
            //Після виконання функції addGenres, виконується метод then(), який отримує модифіковану колекцію фільмів та викликає функцію renderMovies для їх відображення.
            .then((result) => renderMovies(result))
            //Якщо виконання будь-якої з "обіцянок" завершиться з помилкою, виконується метод catch(), який отримує об'єкт помилки та відображає повідомлення про помилку. У даному випадку виводиться повідомлення про помилку в консоль, а елемент з фідбеком відображається під інпутом.
            .catch((err) => {
                console.log('render: catch error: ', err.message);
                invalidFeedback.classList.remove('visually-hidden');
            })
    }; 
};

//init
//змінна api може використовуватись у коді для виклику методів, які надають доступ до ресурсів API, таких як фільми або жанри.
const api = new ApiService();


Promise.all([api.getPopular(), api.getGenres()])
    .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
    .then((result) => renderMovies(result));

moviesList.addEventListener('click', onMovieClick);
searchInput.addEventListener('input', debounce(onSearchInput, 1200));
