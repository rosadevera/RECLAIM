document.addEventListener("DOMContentLoaded", () => {
    // Letter Animation
    const elements = document.querySelectorAll('h1 span');
    
    // Define animation timings for each span (in milliseconds)
    const delays = [0, 1500, 1600, 1700, 0, 1800]; // Adjust this for each letter

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
    }, 2500); // Delay of 2.5 seconds for the section reveal

    // Image Scattering in .randomgrowth
    const imageContainer = document.querySelector('.randomgrowth.image-container');
    const images = [
        './media/00nycskyline2.png',
        './media/01overgrowth2.png',
        './media/02gov2.png', 
        './media/flower01.png', 
        './media/01plant5.png',
        './media/02chernobyl3.png',
        './media/02gov2.png',
        './media/02gov3.png',
        './media/flower03.png', 
        './media/flower02.png',
        './media/01eyesore1.png', 
        './media/flower11.png',
        './media/02fukushima1.png',
        './media/flower05.png',
        './media/flower06.png',
        './media/03without8.png',
        './media/flower08.png',
        './media/02chernobyl2.png',
        './media/flower13.png',
        './media/vine2.png',
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
            const randomSize = Math.random() * (450 - 350) + 350;
            img.style.width = `${randomSize}px`; // Set random width
            img.style.height = 'auto'; // Maintain aspect ratio

            imgElement.appendChild(img);

            // Adjust image container size (since we allow overflow, larger than viewport)
            const scatterAreaWidth = window.innerWidth * 1; // Allow overflow outside viewport
            const scatterAreaHeight = window.innerHeight * 1;

            // Randomly position the image, some parts may be outside viewport
            const randomX = Math.random() * scatterAreaWidth - (randomSize / 2); // Center randomize
            const randomY = Math.random() * scatterAreaHeight - (randomSize / 2);

            imgElement.style.position = 'absolute'; // Ensure absolute positioning
            imgElement.style.left = `${randomX}px`;
            imgElement.style.top = `${randomY}px`;

            // Append image element to the container
            imageContainer.appendChild(imgElement);

            // Add delay to image appearance
            setTimeout(() => {
                imgElement.classList.add('show');
            }, index * 100); // Stagger appearance

            // Make the image disappear when clicked
            imgElement.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the click from bubbling up
                imgElement.classList.add('hidden'); // Add hidden class on click to fade out
            });

            // Make the image draggable (this needs to happen after appending to DOM)
            $(imgElement).draggable();
        });
    }

    // Wait for 2 seconds after section reveal, then scatter images
    setTimeout(scatterImages, 2100); // Start scattering images 2 seconds after section reveal (4.5 seconds total)
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
