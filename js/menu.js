const burger = document.querySelector('.hamburger');
const menu = document.querySelector('.mobile-menu');

burger.addEventListener('click', () => {
    const isOpen = menu.style.display === 'flex';
    menu.style.display = isOpen ? 'none' : 'flex';
    burger.classList.toggle('open');
});
