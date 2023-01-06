import { $, $$ } from '/js/assets/selectors.js';
import { getDataUser } from '/js/assets/user.js'; 

// search messages

const status = $(".status");
const formSearch = $(".options_search-content");

formSearch.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    
    const search = new FormData(formSearch).get("options_search");
    const allMessages = $$(".message");

    $$(".message_in_search").forEach(message => message.classList.remove("message_in_search"));
    status.textContent = "Buscando en el chat...";
    status.style.display = "block";

    allMessages.forEach(contentMessage => {
        const { textContent } = contentMessage;

        if(textContent.startsWith(search)) {
            contentMessage.children[1].classList.add("message_in_search");
            status.textContent = "Algunos mensajes encontrados";
        }
    });

    hideStatus();
}

// notifications 

$(".options_notification").addEventListener('click', notification);

function notification(){
    Notification.requestPermission(() => {
        if(Notification.permission === "granted") status.textContent = "Notificaciones permitidas";
        else status.textContent = "Notificaciones no permitidas";

        status.style.display = "block";
    });

    hideStatus();
}

// show perfil

$(".options_perfil").addEventListener('click', showPerfil);

function showPerfil() {
    const user = getDataUser();
    const { name, image } = user;
    
    status.style.display = "flex";

    status.innerHTML = `
        ${name} 
        <img src="${image}" alt="${name}" loading="lazy" decoding="async">
    `;

    hideStatus();
}

function hideStatus() {
    setTimeout(() => {
        status.style.display = "none";
    }, 4000)
}