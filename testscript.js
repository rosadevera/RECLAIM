const imageContainer = document.querySelector('.image-container');

// List of image paths
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

// Function to scatter images with random positioning and sizes
function scatterImages() {
    images.forEach((src, index) => {
        const imgElement = document.createElement('div');
        imgElement.classList.add('floating-image');

        // Create the actual image tag
        const img = document.createElement('img');
        img.src = src;

        // Randomize image size (e.g., between 150px and 400px width)
        const randomSize = Math.random() * (400 - 150) + 150;
        // img.style.width = `${randomSize}px`;
        img.style.width = '320px'; // Set desired width
        img.style.height = 'auto'; // Maintain aspect ratio

        imgElement.appendChild(img);

        // Adjust image container size (since we allow overflow, larger than viewport)
        const scatterAreaWidth = window.innerWidth * 1.10; // Allow overflow outside viewport
        const scatterAreaHeight = window.innerHeight * 1.10;

        // Randomly position the image, some parts may be outside viewport
        const randomX = Math.random() * scatterAreaWidth - (randomSize / 2); // Center randomize
        const randomY = Math.random() * scatterAreaHeight - (randomSize / 2);

        imgElement.style.left = `${randomX}px`;
        imgElement.style.top = `${randomY}px`;

        // Append image element to the container
        imageContainer.appendChild(imgElement);

        // Add delay to image appearance
        setTimeout(() => {
            imgElement.classList.add('show');
        }, index * 100); // Stagger appearance

        // Make the image disappear when clicked
        imgElement.addEventListener('click', () => {
            imgElement.classList.add('hidden'); // Add hidden class on click to fade out
        });
    });
}

// Wait for 1.5 seconds before starting the scatter process
setTimeout(scatterImages, 2000);
