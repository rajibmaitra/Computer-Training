// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form submission handling with Web3Forms
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitButton = this.querySelector('.submit-button');
    const originalButtonText = submitButton.textContent;
    
    // Client-side validation
    if (!name || !email || !message) {
        showAlert('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
    }
    
    try {
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Send via Web3Forms
        const success = await sendViaWeb3Forms(name, email, message);
        
        if (success) {
            showAlert('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
            document.getElementById('contactForm').reset();
            console.log('Email sent successfully via Web3Forms');
        } else {
            showAlert('Failed to send message. Please try again.', 'error');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showAlert('An error occurred. Please check the console for details.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Web3Forms email sending (recommended for GitHub Pages)
async function sendViaWeb3Forms(name, email, message) {
    const form = new FormData();
    form.append("access_key", "83f600aa-1b13-4313-95ac-fcb5f6ef18ec");
    form.append("from_name", name);
    form.append("email", email);
    form.append("message", message);
    form.append("subject", `New Contact from ${name}`);
    
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: form
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log("✅ Email sent via Web3Forms:", data);
            return true;
        } else {
            console.error("❌ Web3Forms error:", data);
            return false;
        }
    } catch (error) {
        console.error("❌ Request error:", error);
        return false;
    }
}// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.padding = '1.5rem 2rem';
    alertDiv.style.borderRadius = '8px';
    alertDiv.style.zIndex = '10000';
    alertDiv.style.animation = 'slideIn 0.3s ease';
    alertDiv.style.maxWidth = '400px';
    alertDiv.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    
    if (type === 'success') {
        alertDiv.style.backgroundColor = '#10b981';
        alertDiv.style.color = 'white';
    } else {
        alertDiv.style.backgroundColor = '#ef4444';
        alertDiv.style.color = 'white';
    }
    
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll(
        '.about-card, .zone-card, .module-card, .team-card, .stat, .exam-card'
    );
    
    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Active nav link highlighting
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.style.borderBottom = '3px solid #f59e0b';
            } else {
                link.style.borderBottom = 'none';
            }
        });
    });
});

// Responsive navigation menu toggle (for mobile)
// Hamburger menu toggle for mobile nav
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            navMenu.classList.toggle('open');
        });
        // Close menu when a link is clicked (for better UX)
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals if needed
    }
});

// Enhance form accessibility
function enhanceFormAccessibility() {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#2563eb';
            this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'transparent';
            this.style.boxShadow = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', enhanceFormAccessibility);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate numbers when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                stats.forEach(stat => {
                    const number = parseInt(stat.textContent);
                    if (!isNaN(number)) {
                        animateCounter(stat, number);
                    }
                });
                hasAnimated = true;
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (stats.length > 0) {
        statsObserver.observe(stats[0].parentElement);
    }
});

// Add CSS for animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Log page interactions for analytics
window.addEventListener('load', function() {
    console.log('Technology Training Center website loaded successfully!');
});
