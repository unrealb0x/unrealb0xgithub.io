document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalVideo = document.getElementById('modal-video');
    const closeBtn = document.querySelector('.close');

    function showModal(mediaUrl) {
        const ext = mediaUrl.split('.').pop().toLowerCase();
        
        if (ext === 'jpg' || ext === 'png' || ext === 'gif') {
            // Show image
            modalImg.src = mediaUrl;
            modalImg.style.display = 'block';
            modalVideo.style.display = 'none';
        } else if (ext === 'mp4' || ext === 'webm') {
            // Show video
            modalImg.style.display = 'none';
            modalVideo.src = mediaUrl;
            modalVideo.style.display = 'block';
        } else if (mediaUrl.includes('youtube.com')) {
            // Show YouTube video
            modalImg.style.display = 'none';
            modalVideo.src = mediaUrl;
            modalVideo.style.display = 'block';
        }
        modal.style.display = 'block';
    }

    document.querySelectorAll('.image-container, .artwork-item').forEach(container => {
        container.addEventListener('click', function() {
            const mediaUrl = this.getAttribute('data-media-url');
            showModal(mediaUrl);
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        modalImg.src = '';
        modalVideo.src = '';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalImg.src = '';
            modalVideo.src = '';
        }
    });
});
