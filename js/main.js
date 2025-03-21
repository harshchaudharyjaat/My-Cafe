// Show loading animation
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);
}

// Hide loading animation
function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Handle page navigation and loading
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading animation on initial page load
    hideLoading();

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

    // Handle form submission
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // You can add your newsletter subscription logic here
            alert(`Thank you for subscribing with: ${email}`);
            this.reset();
        });
    }

    // Function to handle page navigation
    function navigateToPage(pageName) {
        showLoading();
        
        // Store the current page in localStorage
        localStorage.setItem('currentPage', pageName);
        
        // Construct the full path to the page
        const pagePath = pageName === 'home.html' ? pageName : `pages/${pageName}`;
        
        // Navigate to the page
        window.location.href = pagePath;
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to product cards on scroll
    const productCards = document.querySelectorAll('.product-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });

    // Check if we're on the home page and if it was accessed directly
    if (window.location.pathname.endsWith('home.html')) {
        const currentPage = localStorage.getItem('currentPage');
        if (!currentPage) {
            // If no current page is stored, this is a direct access
            console.log('Direct access to home page');
        }
    }
}); 