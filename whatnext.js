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

    // List of possible image file paths
    const imagePaths = [
        './media/flower04.png',
        './media/flower01.png',
        './media/03without9.png',
        './media/03without7.png',
        './media/flower09.png',
        './media/flower08.png',
        './media/flower10.png',
        './media/02fukushima3.png',
        './media/02chernobyl2.png',
        './media/03without8.png',
        './media/flower06.png',
        './media/vine2.png',
        './media/vine4.png',
    ];

    // Handle random image appearance when clicking the arrow
    const arrow = document.getElementById('arrow');
    arrow.addEventListener('click', () => {
        const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        const newImage = document.createElement('img');
        newImage.src = randomImagePath;
        newImage.style.position = 'absolute';
        newImage.style.width = '400px';
        newImage.style.opacity = '0';
        newImage.style.transition = 'opacity 0.5s ease';

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const maxLeft = windowWidth - 150;
        const maxTop = windowHeight - 150;

        newImage.style.left = `${Math.random() * maxLeft}px`;
        newImage.style.top = `${Math.random() * maxTop}px`;

        setTimeout(() => {
            newImage.style.opacity = '1';
        }, 10);

        newImage.addEventListener('click', () => {
            newImage.classList.add('hidden');
        });

        document.querySelector('.images').appendChild(newImage);
        $(newImage).draggable();
    });

    // Move the AFK image functionality to the end
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
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile) return;

        afkInterval = setInterval(() => {
            const randomImagePath = afkImagePaths[Math.floor(Math.random() * afkImagePaths.length)];
            const afkImage = document.createElement('img');
            afkImage.src = randomImagePath;
            afkImage.classList.add('afk-image');
            afkImage.style.position = 'absolute';
            afkImage.style.opacity = '0';
            afkImage.style.transition = 'opacity 1s ease';

            const randomWidth = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
            afkImage.style.width = `${randomWidth}px`;
            afkImage.style.height = 'auto';

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            afkImage.style.left = `${Math.random() * (windowWidth - randomWidth)}px`;
            afkImage.style.top = `${Math.random() * (windowHeight - 100)}px`;

            afkContainer.appendChild(afkImage);

            setTimeout(() => {
                afkImage.style.opacity = '1';
            }, 10);
        }, 3000);
    }

    // Function to hide AFK images with fade-out effect
    function hideAfkImages() {
        const afkImages = document.querySelectorAll('.afk-image');
        afkImages.forEach(image => {
            image.style.opacity = '0';
            setTimeout(() => {
                image.remove();
            }, 320);
        });
        clearInterval(afkInterval);
    }

    // Reset the inactivity timeout on user movement
    function resetInactivityTimer() {
        hideAfkImages();
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
            showAfkImages();
        }, 5000);
    }

    // Add event listeners for mouse and keyboard activities
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keydown', resetInactivityTimer);

    // Start the inactivity timer when the page loads
    resetInactivityTimer();
});
