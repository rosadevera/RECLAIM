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

            // Randomize image size (e.g., between 350px and 450px width)
            const randomSize = Math.random() * (450 - 350) + 350;
            img.style.width = `${randomSize}px`; // Set random width
            img.style.height = 'auto'; // Maintain aspect ratio

            imgElement.appendChild(img);

            // Get the width and height of the viewport
            const windowWidth = window.innerWidth; // Current viewport width
            const windowHeight = window.innerHeight; // Current viewport height

            // Randomly position the image within the bounds of the viewport
            const randomX = Math.random() * (windowWidth - randomSize); // Center randomize
            const randomY = Math.random() * (windowHeight - randomSize); // Center randomize

            imgElement.style.position = 'absolute'; // Ensure absolute positioning
            imgElement.style.left = `${randomX}px`;
            imgElement.style.top = `${randomY}px`;
            imgElement.style.zIndex = '10'; // Ensure images are on top of other elements

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
            $(imgElement).draggable({
                start: function (event, ui) {
                    // Ensure z-index is high when dragging
                    imgElement.style.zIndex = '20';
                },
                stop: function (event, ui) {
                    // Reset z-index after dragging
                    imgElement.style.zIndex = '10';
                }
            });
        });
    }

    // Wait for 2 seconds after section reveal, then scatter images
    setTimeout(scatterImages, 2100); // Start scattering images 2 seconds after section reveal (4.5 seconds total)

    // AFK image functionality
    const afkImagePaths = [
        './media/afk1.png',
        './media/afk2.png',
        './media/afk3.png',
        './media/afk4.png',
        './media/afk5.png',
        './media/afk6.png',
        './media/afk7.png'
    ];

    const afkContainer = document.getElementById('afk-images-container');
    let inactivityTimeout;
    let afkInterval;

    // Check for mobile devices
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Function to display AFK images
    function showAfkImages() {
        // Prevent AFK images from showing on mobile devices
        if (isMobile) return;

        // Start adding random AFK images at intervals
        afkInterval = setInterval(() => {
            const randomImagePath = afkImagePaths[Math.floor(Math.random() * afkImagePaths.length)];
            const afkImage = document.createElement('img');
            afkImage.src = randomImagePath;
            afkImage.classList.add('afk-image');
            afkImage.style.position = 'absolute';
            afkImage.style.opacity = '0';
            afkImage.style.transition = 'opacity 1s ease'; // Add fade-in effect

            // Set random widths (between 100px and 300px)
            const randomWidth = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
            afkImage.style.width = `${randomWidth}px`;
            afkImage.style.height = 'auto'; // Adjust height accordingly

            // Set random positions for the AFK image
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            afkImage.style.left = `${Math.random() * (windowWidth - randomWidth)}px`; // Random left within bounds
            afkImage.style.top = `${Math.random() * (windowHeight - 100)}px`; // Random top within bounds

            afkContainer.appendChild(afkImage);
            
            // Fade in the image
            setTimeout(() => {
                afkImage.style.opacity = '1';
            }, 10);
        }, 3000); // Show a new image every 3 seconds
    }

    // Function to hide AFK images with fade-out effect
    function hideAfkImages() {
        const afkImages = document.querySelectorAll('.afk-image');
        afkImages.forEach(image => {
            image.style.opacity = '0'; // Fade out effect
            setTimeout(() => {
                image.remove(); // Remove after fading out
            }, 320); // Match the timeout with the CSS transition duration
        });
        clearInterval(afkInterval); // Stop showing new AFK images
    }

    // Reset the inactivity timeout on user movement
    function resetInactivityTimer() {
        hideAfkImages(); // Clear AFK images if visible
        clearTimeout(inactivityTimeout); // Reset the inactivity timer
        inactivityTimeout = setTimeout(() => {
            showAfkImages(); // Show AFK images after 5 seconds of inactivity
        }, 5000); // Adjust the delay as needed
    }

    // Add event listeners for mouse and keyboard activities
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keydown', resetInactivityTimer);

    // Start the inactivity timer when the page loads
    resetInactivityTimer();
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
