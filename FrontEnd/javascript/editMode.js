import * as Modal from "./function/modal.js";
import * as ModalNav from "./function/modalNavigation.js";
import { projects } from "./index.js";



Modal.generateGalleryContent(projects);

////////////////////// ouverture de la modale ////////////////////////////////
const editBtns = document.querySelectorAll("button.edit-btn");
editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", ModalNav.openModal);
});

////////////////////// fermeture de la modale ////////////////////////////////
const closeBtns = document.querySelectorAll("i.fa-xmark");
closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", ModalNav.closeModal);
});

const modalBg = document.querySelector("div.modal-bg");
modalBg.addEventListener("click", ModalNav.closeModal);

////////////////////// changement de la modale ////////////////////////////////
const modalBtnValidation = document.querySelectorAll("button.modal-btn");
modalBtnValidation.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!btn.classList.contains("no-valide")) {
            ModalNav.toggleModalContent();
        }
    });
});

const arrowBtn = document.querySelector("i.fa-arrow-left");
arrowBtn.addEventListener("click", ModalNav.toggleModalContent);
