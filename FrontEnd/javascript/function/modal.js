/******************************************  
 genere la liste de projet pour l'incorporer a la modale
    param: liste de projet a afficher
 ******************************************/
export function generateGalleryContent(projectList) {
    const modalGalleryContent = document.getElementById(
        "modal-gallery-content"
    );
    projectList.forEach((project) => {
        const modalGallery = document.createElement("div");
        modalGallery.classList.add("img-container");
        modalGallery.innerHTML = `
        <img
        src="${project.imageUrl}"
        alt="${project.title}"
        />
        <button data-id="${project.id}" class="delete">
        <i class="fa-solid fa-trash-can"></i>
        </button>
        `;

        modalGalleryContent.appendChild(modalGallery);
    });
}

/******************************************  
 ouverture de la modale
 ******************************************/
export function openModal() {
    const modal = document.querySelector("section#modal-container");
    modal.classList.remove("not-display");
}

/******************************************  
 fermeture et reset de la modale
 ******************************************/
export function closeModal() {
    const modal = document.querySelector("section#modal-container");
    const modalGallery = document.getElementById("modal-gallery");
    const modalForm = document.getElementById("modal-form");

    modal.classList.add("not-display");
    modalGallery.classList.remove("hide");
    modalForm.classList.add("hide");
}

/******************************************  
 permet de passer de la gellery au formulaire et inverse
 ******************************************/
export function toggleModalContent() {
    const modalGallery = document.getElementById("modal-gallery");
    const modalForm = document.getElementById("modal-form");

    modalGallery.classList.toggle("hide");
    modalForm.classList.toggle("hide");
}
