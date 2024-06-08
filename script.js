{
    "selected": [
        {
            "type": "image",
            "src": "path/to/image1.jpg",
            "description": "Image 1 description",
            "link": "http://example.com"
        },
        {
            "type": "video",
            "src": "path/to/video1.mp4",
            "thumbnail": "path/to/thumbnail1.jpg",
            "description": "Video 1 description",
            "link": "http://example.com"
        }
    ],
    "anotherCategory": [
        {
            "type": "image",
            "src": "path/to/image2.jpg",
            "description": "Image 2 description",
            "link": "http://example.com"
        }
    ]
}

A continuación, ajusta tu código JavaScript para manejar correctamente los datos y verificar que las categorías sean arrays antes de usar forEach:
script.js

javascript

document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cargar los datos de la galería desde el archivo JSON
    fetch('gallery.json')
        .then(response => response.json())
        .then(data => {
            loadGallery(data);
            showGallery('selected'); // Mostrar la galería inicial
        })
        .catch(error => console.error('Error cargando gallery.json:', error));
});

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

function showGallery(galleryType) {
    // Ocultar todas las galerías
    const allGalleries = document.querySelectorAll('.gallery-item');
    allGalleries.forEach(item => item.style.display = 'none');

    // Mostrar solo la galería seleccionada
    const selectedGallery = document.querySelectorAll(`.${galleryType}`);
    selectedGallery.forEach(item => item.style.display = 'block');

    // Actualizar el estado activo del gallerymenu
    const gallerymenuItems = document.querySelectorAll('.gallerymenu-item');
    gallerymenuItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`.gallerymenu-item[onclick="showGallery('${galleryType}')"]`).classList.add('active');
}

function loadGallery(data) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    Object.keys(data).forEach(category => {
        const items = data[category];
        if (Array.isArray(items)) {
            items.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item', category);
                galleryItem.setAttribute('onclick', `openModal('${item.type}', '${item.src}', '${item.description}', '${item.link}')`);

                if (item.type === 'image') {
                    const img = document.createElement('img');
                    img.src = item.src;
                    galleryItem.appendChild(img);
                } else if (item.type === 'video') {
                    const img = document.createElement('img');
                    img.src = item.thumbnail || 'default-thumbnail.jpg';
                    galleryItem.appendChild(img);
                }

                gallery.appendChild(galleryItem);
            });
        } else {
            console.warn(`La categoría ${category} no contiene un array de elementos.`);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImg');
    const modalVideo = document.getElementById('modalVideo');
    const modalImageContainer = document.getElementById('modalImageContainer');
    const modalVideoContainer = document.getElementById('modalVideoContainer');
    const modalDescription = document.getElementById('modalDescription');
    const modalButton = document.getElementById('modalButton');

    window.openModal = (type, src, description, link) => {
        if (type === 'image') {
            modalImg.src = src;
            modalImg.style.display = 'block';
            modalVideoContainer.style.display = 'none';
        } else if (type === 'video') {
            modalVideo.src = src;
            modalImg.style.display = 'none';
            modalVideoContainer.style.display = 'flex';
        }

        modalDescription.textContent = description;
        modalButton.href = link;

        modal.style.display = 'block';
    }

    window.closeModal = () => {
        modal.style.display = 'none';
        modalVideo.src = '';
    }

    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    }

    function resizeModal() {
        const modalContent = document.querySelector('.modal-content');
        modalContent.style.height = `${window.innerHeight * 0.9}px`;
    }

    window.addEventListener('resize', resizeModal);
    resizeModal();
});
