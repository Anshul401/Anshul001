// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);

    themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon based on state
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards, project cards, service cards, and testimonial cards
document.querySelectorAll('.skill-card, .project-card, .service-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add scroll animation to buttons
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(56, 189, 248, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form validation for contact page
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const terms = document.getElementById('terms').checked;
        const formMessage = document.getElementById('formMessage');

        let isValid = true;
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        formMessage.textContent = '';

        if (!name) {
            document.getElementById('nameError').textContent = 'Name is required';
            isValid = false;
        }

        if (!email || !email.includes('@')) {
            document.getElementById('emailError').textContent = 'Valid email is required';
            isValid = false;
        }

        if (!subject) {
            document.getElementById('subjectError').textContent = 'Please select a subject';
            isValid = false;
        }

        if (!message) {
            document.getElementById('messageError').textContent = 'Message is required';
            isValid = false;
        }

        if (!terms) {
            isValid = false;
            alert('Please agree to the terms and conditions.');
        }

        if (!isValid) {
            return;
        }

        formMessage.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
        formMessage.style.color = '#38bdf8';
        formMessage.style.marginTop = '20px';
        contactForm.reset();

        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    });
}

// Dynamically add scroll-based animations
document.addEventListener('DOMContentLoaded', () => {
    // Fade in animation on page load
    const elements = document.querySelectorAll('.hero-content, .section-header');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.animation = 'fadeInUp 0.8s ease forwards';
    });
});

// CSS animations for fade in
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Hamburger menu animation */
  .mobile-menu-btn {
    transition: all 0.3s ease;
  }

  .mobile-menu-btn:active {
    transform: scale(0.95);
  }
`;
document.head.appendChild(style);

console.log('Portfolio script loaded successfully!');
