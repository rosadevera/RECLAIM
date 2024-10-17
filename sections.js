document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById('hamburger');
    const aside = document.querySelector('aside');
    
    // Show the aside when clicking the hamburger
    hamburger.addEventListener('click', () => {
        aside.classList.add('active');
    });

    // Hide the aside when the mouse leaves the aside
    aside.addEventListener('mouseleave', () => {
        aside.classList.remove('active');
    });

    // Add the draggable feature
    $('#floating-image img').draggable();

    // Select all images within the #floating-image section
    const images = document.querySelectorAll('#floating-image img');

    // Add a click event listener to each image to hide on click
    images.forEach((img) => {
        img.addEventListener('click', () => {
            img.classList.add('hidden');
        });
    });

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

    // Function to display AFK images
    function showAfkImages() {
        // Check for mobile devices
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
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
