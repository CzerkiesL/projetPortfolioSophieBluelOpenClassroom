import * as modalNav from "./function/modalNavigation.js";
import * as modalGallery from "./function/modalGallery.js";
import * as modalForm from "./function/modalForm.js";
import { projects } from "./index.js";

////////////////////// charge la partie projet ////////////////////////////////
modalGallery.generateGalleryContent(projects);

modalForm.createCategieOption();

////////////////////// ouverture de la modale ////////////////////////////////
const editBtns = document.querySelectorAll("button.edit-btn");
editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
        modalNav.openModal();
        modalForm.resetForm();
    });
});

////////////////////// fermeture de la modale ////////////////////////////////
const closeBtns = document.querySelectorAll("i.fa-xmark");
closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", modalNav.closeModal);
});

const modalBg = document.querySelector("div.modal-bg");
modalBg.addEventListener("click", modalNav.closeModal);

////////////////////// changement de la modale ////////////////////////////////
const modalBtnValidation = document.getElementById("add-img");
modalBtnValidation.addEventListener("click", () => {
    modalNav.toggleModalContent();
});

const arrowBtn = document.querySelector("i.fa-arrow-left");
arrowBtn.addEventListener("click", () => {
    modalNav.toggleModalContent();
    modalForm.resetForm();
});

///////////// verifie si l'image du formulaire est valide ///////////////////
modalForm.checkImage();

const addForm = document.querySelector("form#modal-form");
addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputImg = document.querySelector("input#image");
    const inputTitle = document.querySelector("input#title");
    const inputCategory = document.querySelector("select#category");

    const formIsValid = modalForm.checkInput();

    if (formIsValid) {
        const newProject = {
            image: inputImg.files[0],
            title: inputTitle.value,
            category: inputCategory.value,
        };
        console.log(newProject);
    }
});
