/*********************************************************
Fonction qui créer un element de la gallery des projet
    param: projet a mettre en page    
*********************************************************/
function createGalleryElement(project) {
    const galleryElement = document.createElement("figure");

    galleryElement.innerHTML = `
    <img src="${project.imageUrl}" alt="${project.title}" />
    <figcaption>${project.title}</figcaption>
    `;

    return galleryElement;
}

/*********************************************************
 Fonction qui ajoute un element dans la gallery des projet
 param : la liste des projet a afficher   
 *********************************************************/
export function createGallery(projectList) {
    const galleryContainer = document.querySelector("div.gallery");
    galleryContainer.innerHTML = "";

    projectList.forEach((project) => {
        const projectElem = createGalleryElement(project);
        galleryContainer.appendChild(projectElem);
    });
}
