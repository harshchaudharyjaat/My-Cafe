// Handle page navigation and loading
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation buttons
    const navButtons = document.querySelectorAll('nav button');
    
    // Add click event listeners to all navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('onclick').split("'")[1];
            navigateToPage(targetPage);
        });
    });

    // Function to handle page navigation
    function navigateToPage(pageName) {
        // Store the current page in localStorage
        localStorage.setItem('currentPage', pageName);
        
        // Construct the full path to the page
        const pagePath = pageName === 'home.html' ? pageName : `pages/${pageName}`;
        
        // Navigate to the page
        window.location.href = pagePath;
    }

    // Check if we're on the home page and if it was accessed directly
    if (window.location.pathname.endsWith('home.html')) {
        const currentPage = localStorage.getItem('currentPage');
        if (!currentPage) {
            // If no current page is stored, this is a direct access
            console.log('Direct access to home page');
        }
    }
}); 