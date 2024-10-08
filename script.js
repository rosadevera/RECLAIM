document.addEventListener("DOMContentLoaded", () => {
    // Letter Animation
    const elements = document.querySelectorAll('h1 span');
    
    // Define animation timings for each span (in milliseconds)
    const delays = [0, 2000, 2100, 2200, 0, 2300]; // Adjust this for each letter

    // Function to animate each span
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.transform = getAnimationTransform(index);
            element.style.transition = 'transform 0.5s ease-in-out';
        }, delays[index]);
    });

    // Section Reveal
    const sections = document.querySelector('.sections');
    setTimeout(() => {
        sections.classList.add('visible');
    }, 2750); // Delay of 2.5 seconds for the section reveal

    // Image Scattering
    const imageContainer = document.querySelector('.image-container');
    const images = [
        './media/01eyesore1.png', 
        './media/02gov2.png', 
        './media/flower01.png', 
        './media/02chernobyl1.png',
        './media/flower02.png',
        './media/flower11.png',
        './media/02fukushima2.png',
        './media/02fukushima1.png',
        './media/00nycskyline.png',
        './media/vine2.png',
        './media/flower04.png',
        './media/flower05.png',
        './media/flower06.png',
        './media/flower07.png',
        './media/flower08.png',
        './media/flower10.png',
        './media/flower13.png',
    ];

    // Function to scatter images
    function scatterImages() {
        images.forEach((src, index) => {
            const imgElement = document.createElement('div');
            imgElement.classList.add('floating-image');

            const img = document.createElement('img');
            img.src = src;

            const randomSize = Math.random() * (400 - 150) + 150;
            img.style.width = `400px`;
            img.style.height = 'auto';

            imgElement.appendChild(img);

            const scatterAreaWidth = window.innerWidth * 1.1;
            const scatterAreaHeight = window.innerHeight * 1.1;

            const randomX = Math.random() * scatterAreaWidth - randomSize / 2;
            const randomY = Math.random() * scatterAreaHeight - randomSize / 2;

            imgElement.style.left = `${randomX}px`;
            imgElement.style.top = `${randomY}px`;

            imageContainer.appendChild(imgElement);

            setTimeout(() => {
                imgElement.classList.add('show');
            }, index * 200);

            imgElement.addEventListener('click', () => {
                imgElement.classList.add('hidden');
            });
        });
    }

    // Wait for 2 seconds, then scatter images
    setTimeout(scatterImages, 2000);
});

// Function to get the translateY value for each letter
function getAnimationTransform(index) {
    switch (index) {
        case 1: // C
            return 'translateY(-50px)';
        case 2: // L
            return 'translateY(25px)';
        case 3: // A
            return 'translateY(-50px)';
        case 5: // M
            return 'translateY(50px)';
        default:
            return 'translateY(0)'; // No movement for other letters
    }
}
