const modalBackDrop = document.querySelector('.backdrop');

function getScrollbarWidth() {
    const documentWidth = document.documentElement.clientWidth
    return Math.abs(window.innerWidth - documentWidth);
};

function onKeysPress(e) {
    if (e.code === 'Escape') {
        closeModalWindow();
    };
};

function onBackDropClick(e) {
    if (e.target === e.currentTarget) {
        closeModalWindow();
    };
};

function closeModalWindow() {
    modalBackDrop.classList.add('visually-hidden');

    document.body.removeAttribute('style');
    modalBackDrop.removeEventListener('click', onBackDropClick);
    window.removeEventListener('keydown', onKeysPress);
    modalBackDrop.innerHTML = '';
};

export default function openModalWindow() {
    modalBackDrop.classList.remove('visually-hidden');


    document.body.style.paddingRight = getScrollbarWidth() + 'px';
    document.body.style.overflowY = 'hidden';
    
    modalBackDrop.addEventListener('click', onBackDropClick);
    window.addEventListener('keydown', onKeysPress);
};