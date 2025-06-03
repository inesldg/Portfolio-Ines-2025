//Fonction pour que le header se colle en haut de la page au scroll (si on scrolle de plus de 50px)
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});



window.addEventListener('scroll', function() {
    document.getElementById('scrollTopBtn').style.display =
        window.scrollY > 500 ? 'block' : 'none';
});
document.getElementById('scrollTopBtn').onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};