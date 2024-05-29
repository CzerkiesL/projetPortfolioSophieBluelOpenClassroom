/* *******************************************************
Fonction qui créer un element de la gallery des projet
    param: projet a mettre en page    
******************************************************* */
function createGalleryElement(project) {
    let galleryElement = document.createElement("figure");

    galleryElement.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.title}" />
        <figcaption>${project.title}</figcaption>
    `;

    console.log(galleryElement);

    return galleryElement;
}

/* *******************************************************
Fonction qui ajoute un element dans la gallery des projet
    param 1: le container ou ajouter les projet
    param 2: la liste des projet a afficher   
******************************************************* */
export function createGallery(container, projectList) {
    projectList.forEach((project) => {
        let projectElem = createGalleryElement(project);
        container.appendChild(projectElem);
    });
}
