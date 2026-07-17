// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Validate form
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        // Show success message (in a real application, you'd send this to a server)
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}`);

        // Reset form
        this.reset();
    });
}

// Smooth scroll for navigation links
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

// Add scroll effect to navbar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
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

// Project Modal Functionality
const projectModal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const viewProjectLinks = document.querySelectorAll('.view-project');

// Open modal when View Project is clicked
viewProjectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectCard = link.closest('.project-card');
        
        // Get project data from data attributes
        const title = projectCard.dataset.title;
        const description = projectCard.dataset.description;
        const image = projectCard.dataset.image;
        const type = projectCard.dataset.type;
        const status = projectCard.dataset.status;
        const github = projectCard.dataset.github;
        const tagsString = projectCard.dataset.tags;
        const tags = JSON.parse(tagsString);

        // Populate modal
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDescription').textContent = description;
        document.getElementById('modalImage').src = image;
        document.getElementById('modalImage').alt = title;
        document.getElementById('modalType').textContent = type;
        document.getElementById('modalStatus').textContent = status;
        document.getElementById('modalGithub').href = github;

        // Populate tags
        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = '';
        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });

        // Show modal
        projectModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when X is clicked
closeBtn.addEventListener('click', () => {
    projectModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the content
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('show')) {
        projectModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Log to confirm script is loaded
console.log('Portfolio website loaded successfully!');
