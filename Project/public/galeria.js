document.addEventListener('DOMContentLoaded', function() {
    // Selecciona los elementos de la galería
    const galleryItems = document.querySelectorAll('.gallery .image-container');

    // Selecciona el contenedor en el main para las imágenes y videos
    const artworkGrid = document.querySelector('.artwork-grid');

    // Recorre los elementos de la galería y los añade al main
    galleryItems.forEach((item, index) => {
        const mediaUrl = item.getAttribute('data-media-url');

        // Crea un nuevo div para la imagen o video
        const newItem = document.createElement('div');
        newItem.classList.add('artwork-item');

        if (mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm') || mediaUrl.endsWith('.ogg')) {
            // Crear un elemento <video> si es un video
            const newVideo = document.createElement('video');
            newVideo.src = mediaUrl;
            newVideo.autoplay = true;
            newVideo.loop = true;
            newVideo.muted = true;
            newVideo.classList.add('artwork-video');
            newVideo.style.pointerEvents = 'none'; // Deshabilita la interacción del usuario
            newItem.appendChild(newVideo);
        } else {
            // Crear un elemento <img> si es una imagen
            const newImg = document.createElement('img');
            newImg.src = mediaUrl;
            newImg.alt = `Artwork ${index + 1}`;
            newImg.classList.add('artwork-img');
            newItem.appendChild(newImg);
        }

        // Añade el nuevo div al contenedor en el main
        artworkGrid.appendChild(newItem);
    });
});
