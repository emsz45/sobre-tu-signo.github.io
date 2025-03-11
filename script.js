// Función para mostrar el modal
const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const closeBtns = document.querySelectorAll('.close-btn');

// Mostrar modal
modalTriggers.forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
    });
});

// Cerrar modal
closeBtns.forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal'); // Encuentra el modal más cercano
        modal.style.display = 'none';
    });
});

// Cerrar modal si se hace clic fuera de la ventana modal
window.addEventListener('click', function(event) {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Función para manejar el formulario
const form = document.querySelector('.contact-form form'); 
const thankYouMessage = document.getElementById('thank-you-message');

// Escuchar el evento 'submit' en el formulario
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

    // Mostrar un mensaje de "Cargando" (opcional)
    const loadingMessage = document.createElement('p');
    loadingMessage.innerText = 'Enviando...';
    form.appendChild(loadingMessage);

    // Enviar los datos del formulario a Formspree usando Fetch
    const formData = new FormData(form);
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Si el formulario se envía correctamente
            form.style.display = 'none'; // Ocultamos el formulario
            thankYouMessage.style.display = 'block'; // Mostramos el mensaje de agradecimiento
        } else {
            alert('Hubo un problema al enviar el formulario. Intenta de nuevo.');
        }
    })
    .catch(error => {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un problema al enviar el formulario. Intenta de nuevo.');
    })
    .finally(() => {
        loadingMessage.remove(); // Eliminar el mensaje de "Cargando"
    });
});
