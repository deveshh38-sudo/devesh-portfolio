// --- 1. Navbar Scroll Effect Logic ---
const navbar = document.getElementById('navbar');
const scrollThreshold = 50; 

function handleScroll() {
    if (window.scrollY >= scrollThreshold) {
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

function openLightbox(src) {
    lightboxImage.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeLightbox() {
    lightbox.classList.remove('active'); 
    document.body.style.overflow = '';
    lightboxImage.src = '';
}

posterImages.forEach(img => {
    img.addEventListener('click', (event) => {
        const largeSrc = event.currentTarget.getAttribute('data-large-src');
        if (largeSrc) {
            openLightbox(largeSrc);
        }
    });
    
    // --- NEW: Add Decode Hint for Faster Rendering ---
    if ('decode' in img) {
        img.decode();
    }
});

document.getElementById('lightbox-close').addEventListener('click', (event) => {
    event.stopPropagation();
    closeLightbox();
});


// --- 3. Thumbnail / Fake Embed Logic ---

const videoItems = document.querySelectorAll('.video-item');

function initializeMedia() {
    // --- Check and initialize video thumbnails ---
    videoItems.forEach(item => {
        const thumbnailDiv = item.querySelector('.video-thumbnail');
        if (!thumbnailDiv || !thumbnailDiv.hasAttribute('data-video-id')) return;

        const videoId = thumbnailDiv.getAttribute('data-video-id');
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        thumbnailDiv.style.backgroundImage = `url('${thumbnailUrl}')`;

        thumbnailDiv.addEventListener('click', () => {
            loadIframe(item, videoId);
        });
    });
}

function loadIframe(container, videoId) {
    const iframeHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;

    const videoContainer = container.querySelector('.video-container');
    videoContainer.innerHTML = iframeHTML;
}

// Start the media initialization
initializeMedia();