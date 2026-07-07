// Initialize EmailJS
emailjs.init("nEGOQiqBEf4LeUGDU03H1");

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

// ===================== CONTACT FORM WITH EMAILJS =====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const terms = document.getElementById('terms').checked;
        const formMessage = document.getElementById('formMessage');
        const submitBtn = document.getElementById('submitBtn');

        // Clear previous messages
        let isValid = true;
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        formMessage.textContent = '';

        // Validation
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
            document.getElementById('termsError').textContent = 'Please agree to the terms';
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formMessage.textContent = 'Sending your message...';
        formMessage.style.color = '#38bdf8';

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                'service_yg1u1zg',
                'template_ook7z5p',
                {
                    from_name: name,
                    from_email: email,
                    phone: phone || 'Not provided',
                    subject: subject,
                    message: message,
                    to_email: 'jangraansul4535@gmail.com'
                }
            );

            if (response.status === 200) {
                // Success message
                formMessage.textContent = '✅ Thank you! Your message has been sent successfully. I will get back to you soon.';
                formMessage.style.color = '#10b981';
                formMessage.style.marginTop = '20px';
                formMessage.style.fontWeight = '600';
                
                // Reset form
                contactForm.reset();
                
                // Log success
                console.log('Email sent successfully:', response);

                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 5000);
            }
        } catch (error) {
            // Error message
            console.error('Error sending email:', error);
            formMessage.textContent = '❌ Oops! There was an error sending your message. Please try again or contact me directly.';
            formMessage.style.color = '#ef4444';
            formMessage.style.marginTop = '20px';
            formMessage.style.fontWeight = '600';
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
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

  /* Form button loading state */
  .btn-large:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  /* Form message animation */
  #formMessage {
    animation: slideIn 0.4s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

console.log('Portfolio script loaded successfully with EmailJS!');
