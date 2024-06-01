import * as Modal from "./function/modal.js";
import { projects } from "./index.js"; // import la liste de projet

Modal.generateGalleryContent(projects);

////////////////////// ouverture de la modale ////////////////////////////////
const editBtns = document.querySelectorAll("button.edit-btn");
editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", Modal.openModal);
});

////////////////////// fermeture de la modale ////////////////////////////////
const closeBtns = document.querySelectorAll("i.fa-xmark");
closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", Modal.closeModal);
});

const modalBg = document.querySelector("div.modal-bg");
modalBg.addEventListener("click", Modal.closeModal);

////////////////////// changement de la modale ////////////////////////////////
const modalBtnValidation = document.querySelectorAll("button.modal-btn");
modalBtnValidation.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!btn.classList.contains("no-valide")) {
            Modal.toggleModalContent();
        }
    });
});

const arrowBtn = document.querySelector("i.fa-arrow-left");
arrowBtn.addEventListener("click", Modal.toggleModalContent);
