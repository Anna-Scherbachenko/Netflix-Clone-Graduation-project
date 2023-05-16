//створення шаблону, який буде виводитись у функції renderMovies
//запускаємо цикл, який отримує масив (arr) фільмів і повертаємо HTML фільмів (output)
export const moviesAll = (arr) => {
    // console.log('arr: ', arr);

    let output = '';
    arr.forEach(el => {
        let { title, release_date, poster_path, vote_average, genre_names, id } = el;
        // console.log(el);
        output += `<li class="list-item modal">
                <img data-id="${id}" class="list-item__img" src="https://image.tmdb.org/t/p/w300/${poster_path}" alt="poster">
                <p class="list-item__title">${title}</p>
                <p class="list-item__genre">${genre_names.join(', ')}</p>
                <div class="list-item__descr">
                    <p class="list-item__about">${release_date}</p>
                    <p class="list-item__rating">${vote_average}</p>
                </div>
            </li>`;
    });
    return output;
};