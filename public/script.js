// Toggle menu
function toggleMenu() {
            var fullScreenMenu = document.getElementById('full-screen-menu');
            var menuToggle = document.getElementById('menu-toggle');
            var body = document.body;

            if (fullScreenMenu.style.display === 'flex') {
                fullScreenMenu.style.display = 'none';
                menuToggle.classList.remove('active');
                body.classList.remove('no-scroll');
            } else {
                fullScreenMenu.style.display = 'flex';
                menuToggle.classList.add('active');
                body.classList.add('no-scroll');
            }
        }

// Cierra el menú
window.addEventListener('click', function(event) {
    var menu = document.getElementById('full-screen-menu');
    var menuToggle = document.getElementById('menu-toggle');
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.style.display = 'none';
        menuToggle.classList.remove('active');
    }
});

// Elementos de la galeria
document.addEventListener('DOMContentLoaded', () => {
    const collectionItems = document.querySelectorAll('.collection-item');

    collectionItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.collection-img');
            const altText = img.getAttribute('alt').toLowerCase().replace(/ /g, ''); // Obtener el alt y convertirlo a lowercase sin espacios
            window.location.href = `collections.html?collection=${altText}`;
        });
    });

    const images = document.querySelectorAll('.artwork-img');
    images.forEach(image => {
        image.addEventListener('click', () => {
            const id = image.getAttribute('data-id');
            window.location.href = `detail.html?image=${id}`;
        });
    });
});

// MENU DE LA galeria
function showSection(sectionId) {
    var sections = document.querySelectorAll('.tab-content');
    sections.forEach(function(section) {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Mostrar la primera sección por defecto
document.addEventListener('DOMContentLoaded', function () {
    showSection('artworks');
});

// SCROLL
// Obtener el botón de scroll hacia arriba
const scrollTopButton = document.getElementById('scroll-top');

// Función para mostrar u ocultar el botón según la posición de desplazamiento
function toggleScrollTopButton() {
    if (window.scrollY > 300) { // Muestra el botón cuando el usuario ha hecho scroll más de 300px hacia abajo
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }
}

// Agregar un listener para detectar el scroll y mostrar/ocultar el botón
window.addEventListener('scroll', toggleScrollTopButton);

// Función para hacer scroll suave hacia arriba
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Scroll suave
    });
}