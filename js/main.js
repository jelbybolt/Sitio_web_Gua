// Scroll suave a secciones (para navegación)
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Animación de entrada al scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.info-section');
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });
});

// Manejo del formulario
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te responderemos pronto.');
});