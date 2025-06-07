// Header scroll effect
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
            });
        }
    });
}, observerOptions);

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Animate elements on scroll
const animateOnScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add animation classes to elements
const animateElements = document.querySelectorAll('.section-header, .about-content, .skill-category, .project-item, .project-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScrollObserver.observe(el);
});

// Glitch effect for hero name
const glitchElement = document.querySelector('.glitch');
if (glitchElement) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchElement.style.animation = 'none';
            glitchElement.offsetHeight; // Trigger reflow
            glitchElement.style.animation = null;
        }
    }, 100);
}

// Terminal typing effect
const terminalLines = document.querySelectorAll('.code-line');
terminalLines.forEach((line, index) => {
    line.style.opacity = '0';
    line.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
});

// Add CSS for terminal animation
const terminalStyle = document.createElement('style');
terminalStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(terminalStyle);

// Parallax effect for grid lines
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.2;
    
    const gridLines = document.querySelectorAll('.grid-line');
    gridLines.forEach((line, index) => {
        const speed = (index + 1) * 0.1;
        line.style.transform = `translateY(${rate * speed}px)`;
    });
});

// Add active navigation highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animation for project items
const projectItems = document.querySelectorAll('.project-item');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, {
    threshold: 0.1
});

projectItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    projectObserver.observe(item);
});

// Add CSS for active nav links
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active .nav-text {
        color: #64ffda !important;
    }
    
    .nav-link.active .nav-number {
        color: #64ffda !important;
    }
`;
document.head.appendChild(navStyle);

// Cursor trail effect (optional enhancement)
let mouseX = 0;
let mouseY = 0;
let trailElements = [];

// Create trail elements
for (let i = 0; i < 10; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #64ffda;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: ${1 - i * 0.1};
        transition: all 0.1s ease;
    `;
    document.body.appendChild(trail);
    trailElements.push(trail);
}

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate trail
function animateTrail() {
    let x = mouseX;
    let y = mouseY;
    
    trailElements.forEach((trail, index) => {
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        const nextTrail = trailElements[index + 1] || trailElements[0];
        x += (parseFloat(nextTrail.style.left) - x) * 0.3;
        y += (parseFloat(nextTrail.style.top) - y) * 0.3;
    });
    
    requestAnimationFrame(animateTrail);
}

animateTrail();

// Hide cursor trail on mobile
if (window.innerWidth <= 768) {
    trailElements.forEach(trail => {
        trail.style.display = 'none';
    });
}