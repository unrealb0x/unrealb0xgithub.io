// Añadir evento a los enlaces para la animación de salida
        document.querySelectorAll('a.navigate').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                document.body.style.animation = 'slideOut 0.5s forwards';
                setTimeout(() => {
                    window.location.href = this.href;
                }, 500); // Tiempo de la animación
            });
        });