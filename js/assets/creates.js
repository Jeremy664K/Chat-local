import { $ } from '/js/assets/selectors.js';

export function createChat(name, image, lastMessage, lastMessageTime) {
    $(".aside_panel_messages").innerHTML = "";
    
    const chatContent = document.createElement('li');
    
    const chatButton = document.createElement('button');
    chatButton.title = name;
    chatButton.classList.add('panel_message');

    const chatImage = document.createElement('img');
    chatImage.loading = "lazy";
    chatImage.decoding = "async";
    chatImage.alt = `Imagen de ${name}`;
    chatImage.src = image;

    const chatName = document.createElement('h3');
    chatName.textContent = name;

    const chatLastMessage = document.createElement('p');
    chatLastMessage.textContent = lastMessage;
    
    const chatLastMessageTime = document.createElement('p');
    chatLastMessageTime.classList.add("message_right")
    chatLastMessageTime.textContent = lastMessageTime;

    chatButton.appendChild(chatImage);
    chatButton.appendChild(chatName);
    chatButton.appendChild(chatLastMessage);
    chatButton.appendChild(chatLastMessageTime);

    chatContent.appendChild(chatButton);

    $(".aside_panel_messages").appendChild(chatContent);
}

export function createMessage(name, image, message, position) {
    const messageContent = document.createElement('li');
    messageContent.classList.add('messages_item');

    const positionMessage = document.createElement('div');
    positionMessage.classList.add('message', position);

    const imageMessage = document.createElement('img');
    imageMessage.loading = "lazy";
    imageMessage.decoding = "async";
    imageMessage.alt = `Imagen de ${name}`;
    imageMessage.src = image;

    const textMessage = document.createElement('p');
    textMessage.textContent = message;
    
    positionMessage.appendChild(imageMessage);
    positionMessage.appendChild(textMessage);
    messageContent.appendChild(positionMessage);

    $(".main_messages").appendChild(messageContent);
}

export function createNotification(message) {
    if(Notification.permission === 'granted') 
        new Notification(`Nuevo mensaje: ${message}`);
}