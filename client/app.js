// Main Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Page Navigation System
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const dockItems = document.querySelectorAll('.dock-item');

    function navigateToPage(pageName) {
        navLinks.forEach(l => l.classList.remove('active'));
        
        const matchingNavLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
        if (matchingNavLink) {
            matchingNavLink.classList.add('active');
        }
        
        pageSections.forEach(section => section.classList.remove('active'));
        
        const pageId = 'page-' + pageName;
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPage(this.getAttribute('data-page'));
        });
    });

    // Dock items
    dockItems.forEach(item => {
        item.addEventListener('click', function() {
            navigateToPage(this.getAttribute('data-page'));
        });
    });

    // Category pills
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', function() {
            document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });

        searchInput.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Action cards click
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.action-title').textContent;
            console.log('Clicked:', title);
            // You can add navigation or modal logic here
        });
    });

    // Condition cards click
    document.querySelectorAll('.condition-card').forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('.condition-name').textContent;
            console.log('Clicked condition:', name);
            // You can add navigation or modal logic here
        });
    });

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add animation on scroll for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe action cards and condition cards
    document.querySelectorAll('.action-card, .condition-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
