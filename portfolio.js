console.log('portfolio.js loaded');

window.addEventListener('load', function() {
    console.log('Window loaded');
    const loader = document.getElementById('loading');
    if (loader) {
        setTimeout(() => {
            console.log('Hiding loader');
            loader.classList.add('hidden');
        }, 500);
    }
    document.body.classList.remove('no-js');
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    try {
        initNavigation();
        initScrollEffects();
        initAnimations();
        initSkillBars();
        initContactForm();
        initTypewriter();
        animateCounters();
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

function initNavigation() {
    console.log('Initializing navigation');
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar || !mobileMenu || !navMenu) {
        console.error('Navigation elements not found:', { navbar, mobileMenu, navMenu });
        return;
    }

    mobileMenu.addEventListener('click', function() {
        console.log('Mobile menu toggled');
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav link clicked:', this.getAttribute('href'));
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
}

function initScrollEffects() {
    console.log('Initializing scroll effects');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Element visible:', entry.target);
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
    animatedElements.forEach(el => observer.observe(el));
}

function initAnimations() {
    console.log('Initializing animations');
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-img-wrapper');
    const skillCategories = document.querySelectorAll('.skill-category');
    const projectCards = document.querySelectorAll('.project-card');
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');

    if (aboutText) aboutText.classList.add('slide-left');
    if (aboutImage) aboutImage.classList.add('slide-right');
    if (contactInfo) contactInfo.classList.add('slide-left');
    if (contactForm) contactForm.classList.add('slide-right');

    skillCategories.forEach((category, index) => {
        category.classList.add('fade-in');
        category.style.transitionDelay = `${index * 0.2}s`;
    });

    projectCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.2}s`;
    });
}

function initSkillBars() {
    console.log('Initializing skill bars');
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Skill bar visible:', entry.target);
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width') || 0;
                skillBar.style.width = width + '%';
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

function initContactForm() {
    console.log('Initializing contact form');
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        const submitBtn = this.querySelector('.btn-primary');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            this.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 2000);
    });
}

function initTypewriter() {
    console.log('Initializing typewriter');
    const titleElement = document.querySelector('.hero-title .highlight');
    if (!titleElement) {
        console.error('Hero title highlight element not found');
        return;
    }
    const name = 'Susmita Yadav';
    titleElement.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < name.length) {
            titleElement.textContent += name.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    setTimeout(typeWriter, 1500);
}

function animateCounters() {
    console.log('Initializing counters');
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;
    counters.forEach(counter => {
        const target = counter.getAttribute('data-target') ? +counter.getAttribute('data-target') : parseInt(counter.textContent);
        const count = +counter.innerText.replace('+', '') || 0;
        const updateCount = () => {
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + '+';
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '+';
            }
        };
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log('Counter visible:', counter);
                updateCount();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });
        observer.observe(counter);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    console.log('Showing notification:', message, type);
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}