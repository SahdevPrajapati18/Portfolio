// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (!mobileToggle || !navLinks) return;
    
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinkElements = document.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Also handle hero buttons
    const heroProjectsBtn = document.querySelector('.hero-buttons .btn-primary');
    if (heroProjectsBtn) {
        heroProjectsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector('#projects');
            if (targetSection) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    
    if (!header) return;
    
    let currentSection = '';
    const headerHeight = header.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Skill card hover effects
function initSkillCardEffects() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const skillName = card.getAttribute('data-skill');
            if (skillName) {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Typing animation for hero title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after initial delay
        setTimeout(typeWriter, 1500);
    }
}

// Project card interactions
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.project-image');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.project-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Parallax effect for floating shapes
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Theme switching functionality
function initThemeChanger() {
    const themeButton = document.querySelector('.theme');
    const rootElement = document.documentElement;
    
    if (!themeButton) return;
    
    let currentTheme = 0;
    
    const themes = [
        {
            primary: '#F1FFE1',
            secondary: '#5A827E',
            accent: '#84AE92',
            black: '#24512D'
        },
        {
            primary: '#071952',
            secondary: '#3B666A',
            accent: '#DDF2FD',
            tri2: '#393E46'
        },
        {
            primary: '#F1EFEC',
            secondary: '#030303',
            accent: '#547792',
            gray: '#123458',
            black: '#27445D'
        }
    ];
    
    themeButton.addEventListener('click', () => {
        const theme = themes[currentTheme];
        
        Object.entries(theme).forEach(([property, value]) => {
            rootElement.style.setProperty(`--${property}`, value);
        });
        
        currentTheme = (currentTheme + 1) % themes.length;
    });
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formButton = contactForm.querySelector('button[type="submit"]');
        const originalText = formButton.innerHTML;
        
        // Show loading state
        formButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        formButton.disabled = true;
        
        try {
            // Get form data
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Validate form data
            if (!name || !email || !message) {
                throw new Error('Please fill in all fields');
            }
            
            if (!isValidEmail(email)) {
                throw new Error('Please enter a valid email address');
            }
            
            // Send email using preferred method
            await sendEmail(name, email, message);
            
            showSuccessMessage();
            contactForm.reset();
            
        } catch (error) {
            showErrorMessage(error.message);
        } finally {
            // Reset button state
            formButton.innerHTML = originalText;
            formButton.disabled = false;
        }
    });
}

// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'tZyGMWBBwwgLj5CB9',    // Replace with your EmailJS public key
    SERVICE_ID: 'service_6b78kht',            // Replace with your EmailJS service ID
    TEMPLATE_ID: 'template_9u8kz4f'           // Replace with your EmailJS template ID
};

// Email sending function with EmailJS
async function sendEmail(name, email, message) {
    try {
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.warn('EmailJS not loaded, falling back to mailto');
            return sendEmailFallback(name, email, message);
        }

        // EmailJS template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_name: 'Sahdev Prajapati',
            reply_to: email,
            // You can add more parameters as needed
            subject: `Portfolio Contact from ${name}`
        };

        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
        );

        console.log('Email sent successfully:', response);
        return response;

    } catch (error) {
        console.error('EmailJS error:', error);
        
        // Fallback to mailto if EmailJS fails
        if (error.status === 400) {
            throw new Error('Please check your EmailJS configuration');
        } else if (error.status === 402) {
            throw new Error('EmailJS quota exceeded. Please try again later.');
        } else {
            console.log('Falling back to mailto due to error');
            return sendEmailFallback(name, email, message);
        }
    }
}

// Fallback email function (mailto)
function sendEmailFallback(name, email, message) {
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:sahdevprajapati27@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoLink);
    return Promise.resolve({ status: 200, text: 'Mailto opened' });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    createNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
}

function showErrorMessage(message) {
    createNotification(message, 'error');
}

function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Interactive cursor effects
function initCursorEffects() {
    let cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.className = 'cursor';
            cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, var(--primary, #84AE92), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0.5;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(cursor);
        }
        
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
}

// Page loading animations
function initLoadingAnimations() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Add entrance animation to main content
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                mainContent.style.transition = 'all 0.8s ease';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}

// Initialize EmailJS when the page loads
function initEmailJS() {
    // Check if EmailJS config is properly set
    if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
        console.warn('EmailJS not configured. Please set your EmailJS credentials.');
        return;
    }

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS initialized successfully');
    } else {
        console.warn('EmailJS library not loaded');
    }
}
// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS first
    initEmailJS();
    
    // Initialize all components
    createParticles();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initSkillCardEffects();
    initContactForm();
    initProjectCardEffects();
    initParallaxEffect();
    initThemeChanger();
    initTypingAnimation();
    initCursorEffects();
    initLoadingAnimations();
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        updateActiveNavLink();
    });
    
    // Add resize event listener for responsive adjustments
    window.addEventListener('resize', () => {
        // Close mobile menu on resize
        const mobileToggle = document.getElementById('mobile-toggle');
        const navLinks = document.getElementById('nav-links');
        
        if (window.innerWidth > 768 && mobileToggle && navLinks) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    handleHeaderScroll();
    updateActiveNavLink();
}, 10);

// Replace the scroll event listener with debounced version for better performance
window.addEventListener('scroll', debouncedScrollHandler);