export const movieSingle = (obj) => {

    let { title, release_date, poster_path, vote_average, genre_names, original_title, vote_count, genres, overview } = obj;
    return `<div class="modal-wrapper">
        <div class="modal-left">
            <img class="modal-left__img" src="https://image.tmdb.org/t/p/w300/${poster_path}"  alt="poster">
        </div>
        <div class="modal-right">
            <h3 class="modal-right__title">${title}</h3>
            <div class="modal-right__box"><p>Оригінальний заголовок:</p>
            <p>${original_title}</p></div>
            <ul class="modal-right__list">
                <li class="modal-right__item"><span>Рейтинг:</span><span>${vote_average.toFixed(1)}</span></li>
                <li class="modal-right__item"><span>Кількість голосів:</span><span>${vote_count}</span></li>
                <li class="modal-right__item"><span>Дата виходу:</span><span>${release_date}</span></li>
            </ul>
            <div class="modal-right__box">
            <p class="">Жанри:</p>
            <p>${genres
            .map((el) => el.name)
            .join('</span>, ')}</p></div>
            <p class="modal-right__about">Опис:</p>
            <p class="modal-right__text">${overview}</p>
             <a class="modal-right__btn btn" href="#" target="_blank">Дивитися</a>
        </div>
    </div>`;
};