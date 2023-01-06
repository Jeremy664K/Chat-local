import { $, $$ } from '/js/assets/selectors.js';
import { createChat, createMessage, createNotification } from '/js/assets/creates.js';
import { getDataUser } from '/js/assets/user.js';

// get messages

let keyIncrement = 0;

if(navigator.serviceWorker) {
    navigator.serviceWorker.register("/sw.js");

    navigator.serviceWorker.addEventListener("message", e => {
        keyIncrement++;
        localStorage.setItem(keyIncrement, e.data)
    });

    addEventListener('storage', () => {
        keyIncrement++;
        const [name, image, message, position, time] = localStorage.getItem(keyIncrement).split('||');

        $("#title_name").textContent = name;

        createChat(name, image, message, time);
        createMessage(name, image, message, position);
        createNotification(message);

        window.scrollTo(0, window.scrollY + 999999999999);
    })
}

// post messages

$(".form_send").addEventListener('submit', async e => {
    e.preventDefault();
    const message = new FormData(e.target).get("send_message");
    const user = getDataUser();
    const date = new Date();

    createMessage(user.name, user.image, message, "message_right");

    const readyService = await navigator.serviceWorker.ready;
    readyService.active.postMessage([user.name, user.image, message, "message_left", `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`].join("||"));

    e.target.reset();
    $('emoji-picker').classList.add('modal_open');
    window.scrollTo(0, window.scrollY + 999999999999);
});

// emojis

$(".form_emojis").addEventListener('click', () => $('emoji-picker').classList.toggle('modal_open'));

$('emoji-picker').addEventListener('emoji-click', event => {
    const { unicode } = event.detail;
    $(".form_write_message").value += unicode;
});

// delete chat

$(".aside_delete-chat").addEventListener('click', deleteChat);

function deleteChat(){
    $(".main_messages").innerHTML = "";
    keyIncrement = 0;
    localStorage.clear();
}

// change screen phone mode

$$(".main_change_screen").forEach(button => button.addEventListener('click', changeScreenPhone));
const main = $(".main");

function changeScreenPhone() {
    main.classList.toggle("modal_open");
    $(".aside").style.display = "block";

    if(!(main.classList.contains("modal_open"))) $(".aside").style.display = "none";
}