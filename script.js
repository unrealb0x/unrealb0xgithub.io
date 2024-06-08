document.addEventListener('DOMContentLoaded', function() {
    fetch('gallery.json')
        .then(response => response.json())
        .then(data => {
            window.galleryData = data;
            showGallery('selected'); // Mostrar la galería inicial (selected)
        })
        .catch(error => console.error('Error loading gallery data:', error));
});

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

function showGallery(galleryType) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Limpiar la galería actual

    const galleryItems = window.galleryData[galleryType];
    if (!Array.isArray(galleryItems)) {
        console.error(`Data for gallery type "${galleryType}" is not an array`);
        return;
    }

    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${galleryType}`;

        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.description;
            img.onclick = () => openModal('image', item.src, item.description, item.link);
            galleryItem.appendChild(img);
        } else if (item.type === 'video') {
            const thumbnail = document.createElement('img');
            thumbnail.src = item.thumbnail;
            thumbnail.alt = item.description;
            thumbnail.onclick = () => openModal('video', item.src, item.description, item.link);
            galleryItem.appendChild(thumbnail);
        }

        gallery.appendChild(galleryItem);
    });

    const gallerymenuItems = document.querySelectorAll('.gallerymenu-item');
    gallerymenuItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`.gallerymenu-item[onclick="showGallery('${galleryType}')"]`).classList.add('active');
}

function openModal(type, src, description, link) {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImg');
    const modalVideo = document.getElementById('modalVideo');
    const modalImageContainer = document.getElementById('modalImageContainer');
    const modalVideoContainer = document.getElementById('modalVideoContainer');
    const modalDescription = document.getElementById('modalDescription');
    const modalButton = document.getElementById('modalButton');

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

function closeModal() {
    const modal = document.getElementById('myModal');
    const modalVideo = document.getElementById('modalVideo');
    modal.style.display = 'none';
    modalVideo.src = '';
}

window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
};

function resizeModal() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.height = `${window.innerHeight * 0.9}px`;
}

window.addEventListener('resize', resizeModal);
resizeModal();

