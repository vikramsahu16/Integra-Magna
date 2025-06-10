/**
 * Integra Magna Landing Page Interactive Features
 * Author: Technical Assessment Submission
 * Date: June 10, 2025
 */

// Theme Toggle Functionality
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    
    // Add smooth transition effect
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
    
    // Optional: Store theme preference in localStorage
    // localStorage.setItem('theme', newTheme);
}

// Initialize Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveElements();
    initializeFeatureTags();
    initializeNavigation();
    initializeParallaxEffect();
    initializeRippleEffect();
    initializeLoadingAnimation();
});

// Interactive hover effects for elements with 'interactive' class
function initializeInteractiveElements() {
    document.querySelectorAll('.interactive').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Feature tags interaction
function initializeFeatureTags() {
    document.querySelectorAll('.feature-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            document.querySelectorAll('.feature-tag').forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            this.classList.add('active');
            
            // Optional: Add animation feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Smooth scrolling for navigation
function initializeNavigation() {
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax effect for hero card
function initializeParallaxEffect() {
    const heroCard = document.querySelector('.hero-card');
    
    if (heroCard) {
        document.addEventListener('mousemove', function(e) {
            const rect = heroCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (y / rect.height) * 10;
            const rotateY = (x / rect.width) * -10;
            
            heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Reset card transform when mouse leaves the document
        document.addEventListener('mouseleave', function() {
            heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
}

// Add ripple effect to buttons
function initializeRippleEffect() {
    document.querySelectorAll('.sign-up-btn, .demo-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple element after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
}

// Add loading animation
function initializeLoadingAnimation() {
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Avatar interaction effects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.avatar').forEach((avatar, index) => {
        avatar.addEventListener('click', function() {
            // Add bounce animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 0.6s ease-in-out';
            }, 10);
            
            // Optional: Show tooltip or perform action
            console.log(`Avatar ${index + 1} clicked!`);
        });
    });
});

// Feature card interaction
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function() {
            // Add click feedback
            this.style.transform = 'translateY(-10px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1)';
            }, 150);
            
            // Optional: Navigate to specific section or show modal
            const cardType = this.classList.contains('card-orange') ? 'solutions' :
                            this.classList.contains('card-gray') ? 'studies' : 'projects';
            console.log(`${cardType} card clicked!`);
        });
    });
});

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature-card, .feature-tag').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeScrollAnimations);

// Mobile menu functionality (expandable for future use)
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            
            // Toggle button icon
            this.textContent = nav.style.display === 'flex' ? '✕' : '☰';
        });
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Toggle theme with Ctrl+Shift+T
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Focus management for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Throttle mousemove events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to parallax effect for better performance
document.addEventListener('DOMContentLoaded', function() {
    const heroCard = document.querySelector('.hero-card');
    
    if (heroCard) {
        const throttledParallax = throttle(function(e) {
            const rect = heroCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (y / rect.height) * 10;
            const rotateY = (x / rect.width) * -10;
            
            heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }, 16); // ~60fps
        
        document.addEventListener('mousemove', throttledParallax);
    }
});

// Console welcome message
console.log(`
🚀 Integra Magna Landing Page Loaded Successfully!
📅 Built for Technical Assessment - June 10, 2025
🎨 Features: Dark/Light Mode, Parallax Effects, Micro-interactions
⌨️  Keyboard Shortcut: Ctrl+Shift+T to toggle theme
`);

// Export functions for potential testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        initializeInteractiveElements,
        initializeFeatureTags,
        initializeNavigation,
        throttle
    };
}