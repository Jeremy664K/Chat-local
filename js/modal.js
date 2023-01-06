import { $ } from '/js/assets/selectors.js';

localStorage.clear();

const $dropImage = $(".modal_drop_image");
const $form = $(".modal_form");

const dataUser = {
    name: null,
    image: null
};

$form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData($form));

    const name = formData["modal_name"]
    const image = formData["modal_image"];
    
    if(name !== '') {
        dataUser.name = name;
        readFile(image);

        e.target.reset();
        $(".modal").style.display = "none";
        $(".body_center").classList.remove("modal_open");
    }
}

function readFile(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.addEventListener('load', () => {
        const { result } = fileReader;
        if(result.length > 5) dataUser.image = result;

        sessionStorage.setItem('name', dataUser.name);
        sessionStorage.setItem('image', dataUser.image);
    });
}

$dropImage.addEventListener('dragover', e => e.preventDefault());
$dropImage.addEventListener('dragenter', () => $dropImage.classList.add('modal_is_drop'));
$dropImage.addEventListener('dragleave', () => $dropImage.classList.remove('modal_is_drop'));

$dropImage.addEventListener('drop', e => {
    e.preventDefault();

    $dropImage.classList.remove('modal_is_drop');
    const image = e.dataTransfer.files[0];
    
    readFile(image);
});