import { $ } from '/js/assets/selectors.js';

let name = "";
let image = "";

export function getDataUser() {
    return {
        name,
        image
    };
}

$(".modal_form").addEventListener('submit', () => {
    const $perfil = $("#perfil"); 

    setTimeout(() => {
        name = sessionStorage.getItem('name');
        image = sessionStorage.getItem('image');

        $perfil.alt = `Imagen de ${name}`;
        if(image === "null") image = "/user_default.jpg";
        $perfil.src = image;
    }, 100)
})