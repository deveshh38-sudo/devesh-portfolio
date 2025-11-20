// --- 1. Navbar Scroll Effect Logic ---
const navbar = document.getElementById('navbar');
const scrollThreshold = 50; 

function handleScroll() {
    if (window.scrollY >= scrollThreshold) {
        // Adds the 'scrolled' class (defined in CSS) to change navbar appearance
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);


// --- 2. Lightbox (Full-Screen Image Viewer) Logic ---

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const posterImages = document.querySelectorAll('.poster-gallery img');

/**
 * Opens the lightbox modal with the specified high-resolution image source.
 * @param {string} src - The URL of the image to display.
 */
function openLightbox(src) {
    lightboxImage.src = src;
    // Activate the modal (shows it using the CSS .active class)
    lightbox.classList.add('active');
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden'; 
}

/**
 * Closes the lightbox modal.
 */
function closeLightbox() {
    // Hide the lightbox
    lightbox.classList.remove('active'); 
    // Restore background scrolling
    document.body.style.overflow = '';
    // Clear the image source to release memory/prevent flicker
    lightboxImage.src = '';
}

// Add click listeners to all poster images
posterImages.forEach(img => {
    img.addEventListener('click', (event) => {
        // Get the high-resolution source from the data attribute (data-large-src)
        const largeSrc = event.currentTarget.getAttribute('data-large-src');
        if (largeSrc) {
            openLightbox(largeSrc);
        }
    });
});

// We attach the close handler to the dedicated close button
document.getElementById('lightbox-close').addEventListener('click', (event) => {
    // Stop propagation to ensure clicking the button doesn't trigger the main lightbox click handler
    event.stopPropagation();
    closeLightbox();
});

// The global function closeLightbox() is also called when clicking the dark background 
// overlay via the HTML attribute onclick="closeLightbox()" on the #lightbox element.