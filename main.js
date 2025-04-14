// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (document.querySelector('nav').classList.contains('active')) {
            document.querySelector('nav').classList.remove('active');
            document.querySelector('.mobile-menu i').classList.remove('fa-times');
        }
    });
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Tool Search Functionality
const searchInput = document.querySelector('.search-box input');
const toolCards = document.querySelectorAll('.tool-card');
const toolLinks = document.querySelectorAll('.tools-list a');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    // Search in featured tools
    toolCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Search in all tools list
    toolLinks.forEach(link => {
        const title = link.textContent.split('\n')[0].toLowerCase();
        const desc = link.querySelector('span').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
            link.style.display = 'block';
        } else {
            link.style.display = 'none';
        }
    });
});

// Show random tools in featured section on page load
window.addEventListener('load', function() {
    const allTools = Array.from(document.querySelectorAll('.tools-list a'));
    const featuredToolsContainer = document.querySelector('.tools-grid');
    
    // Only shuffle if on homepage
    if (featuredToolsContainer) {
        // Get 4 random tools
        const shuffled = allTools.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
        
        // Clear current featured tools
        featuredToolsContainer.innerHTML = '';
        
        // Add random tools to featured section
        selected.forEach(tool => {
            const title = tool.textContent.split('\n')[0];
            const desc = tool.querySelector('span').textContent;
            const href = tool.getAttribute('href');
            const iconClass = getIconClass(title);
            
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card';
            toolCard.innerHTML = `
                <div class="tool-icon">
                    <i class="fas ${iconClass}"></i>
                </div>
                <h3>${title}</h3>
                <p>${desc}</p>
                <a href="${href}" class="btn">Use Tool</a>
            `;
            
            featuredToolsContainer.appendChild(toolCard);
        });
    }
});

// Helper function to get appropriate icon class based on tool title
function getIconClass(title) {
    if (title.includes('Image') || title.includes('Photo')) return 'fa-image';
    if (title.includes('PDF')) return 'fa-file-pdf';
    if (title.includes('Word') || title.includes('Document')) return 'fa-file-word';
    if (title.includes('Excel')) return 'fa-file-excel';
    if (title.includes('Video')) return 'fa-video';
    if (title.includes('Audio') || title.includes('MP3')) return 'fa-music';
    if (title.includes('QR')) return 'fa-qrcode';
    if (title.includes('Password')) return 'fa-lock';
    return 'fa-tools';
}

// Initialize tool pages if they exist
if (document.querySelector('.tool-container')) {
    // This would be tool-specific JS loaded from their respective files
    console.log('Tool page initialized');
}

// Ad management
function displayAds() {
    // This would be replaced with actual ad code
    console.log('Ads would be displayed here');
    
    // Example of showing ads at intervals
    setInterval(() => {
        // Show an ad prompt every 5 minutes
        if (document.visibilityState === 'visible') {
            console.log('Showing ad prompt');
            // In a real implementation, this would show an actual ad
        }
    }, 5 * 60 * 1000);
}

// Start ad display after a short delay
setTimeout(displayAds, 3000);
