// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Intersection Observer for animations
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

// Observe elements for animation
document.querySelectorAll('.service-card, .project-card, .stat, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// EmailJS Configuration
(function() {
    emailjs.init("vZ_oWuzEe0GIhKnuE"); // Replace with your EmailJS public key
})();

// Form submission with EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('user_name');
        const email = formData.get('user_email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        const website = formData.get('website'); // Honeypot field
        
        // Check honeypot (if filled, it's likely a bot)
        if (website) {
            console.log('Bot detected via honeypot');
            return; // Silently reject
        }
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        
        // Update button state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        emailjs.sendForm('service_a5kandn', 'template_6c59gav', contactForm)
            .then(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                alert('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente por email.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 20);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            animateCounter(statNumber, number);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Hero title animation (fade in effect)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';
    heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
}

// Lazy loading for images (if any are added later)
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #2563eb;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
const debouncedScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Scroll-based animations and effects
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        if (scrolled > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);
};

window.addEventListener('scroll', debouncedScroll);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize AOS (Animate On Scroll) alternative
    const initAnimations = () => {
        document.querySelectorAll('.service-card, .project-card').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    };
    
    initAnimations();
});

// Error handling for missing elements
const safeQuerySelector = (selector) => {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
};

// Console welcome message
console.log('%c🚀 DVG Consultoria Website', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️ para transformar ideias em soluções tecnológicas', 'color: #64748b; font-size: 14px;');