// Hamburger Menu & Fullscreen Menu
const hamburger = document.getElementById('hamburger');
const fullscreenMenu = document.getElementById('fullscreenMenu');
const menuClose = document.getElementById('menuClose');
const menuLinks = document.querySelectorAll('.menu-link');

// Toggle menu open
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    fullscreenMenu.classList.toggle('active');
    document.body.style.overflow = fullscreenMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu with close button
menuClose.addEventListener('click', () => {
    hamburger.classList.remove('active');
    fullscreenMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// Menu link clicks
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get target section
        const targetId = link.getAttribute('data-section');
        
        // Close menu
        hamburger.classList.remove('active');
        fullscreenMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Scroll to section with smooth animation
        setTimeout(() => {
            if (targetId === 'section1') {
                // Ana sayfaya çıkmak için
                window.scrollTo({ 
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Diğer bölümler için
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }, 300);
        
        // Update active state
        menuLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active menu item on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            menuLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Work Modal Functionality
const workModal = document.getElementById('workModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

// Work items data
const workData = {
    1: {
        title: 'Modern Landscape Project',
        image: 'hero.gif',
        description: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        `
    },
    2: {
        title: 'Garden Design Excellence',
        image: 'hero.gif',
        description: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
        `
    },
    3: {
        title: 'Urban Green Space',
        image: 'hero.gif',
        description: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
        `
    },
    4: {
        title: 'Sustainable Park Design',
        image: 'hero.gif',
        description: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
            <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
        `
    },
    5: {
        title: 'Contemporary Outdoor Living',
        image: 'hero.gif',
        description: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>
            <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>
        `
    }
};

// Open modal function
function openWorkModal(workId) {
    const data = workData[workId];
    if (!data) return;

    modalImage.src = data.image;
    modalTitle.textContent = data.title;
    modalDescription.innerHTML = data.description;

    workModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeWorkModal() {
    workModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Add click events to work items
document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('click', () => {
        const workId = item.getAttribute('data-work');
        openWorkModal(workId);
    });
});

// Close modal events
modalClose.addEventListener('click', closeWorkModal);
modalOverlay.addEventListener('click', closeWorkModal);

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && workModal.classList.contains('active')) {
        closeWorkModal();
    }
});

// Horizontal Slider Functionality
class HorizontalSlider {
    constructor(trackId, dotsId, sliderNum) {
        this.track = document.getElementById(trackId);
        this.dotsContainer = document.getElementById(dotsId);
        this.sliderNum = sliderNum;
        this.currentSlide = 0;
        this.slides = this.track.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        
        this.init();
    }

    init() {
        // Create dots
        this.createDots();
        
        // Add event listeners to navigation buttons
        const prevBtn = document.querySelector(`[data-slider="${this.sliderNum}"].prev-btn`);
        const nextBtn = document.querySelector(`[data-slider="${this.sliderNum}"].next-btn`);
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Touch/Swipe support
        let startX = 0;
        let isDragging = false;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            isDragging = false;
        });

        // Mouse drag support
        let mouseStartX = 0;
        let isMouseDragging = false;

        this.track.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isMouseDragging = true;
            this.track.style.cursor = 'grabbing';
        });

        this.track.addEventListener('mousemove', (e) => {
            if (!isMouseDragging) return;
            e.preventDefault();
        });

        this.track.addEventListener('mouseup', (e) => {
            if (!isMouseDragging) return;
            const endX = e.clientX;
            const diff = mouseStartX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            isMouseDragging = false;
            this.track.style.cursor = 'grab';
        });

        this.track.addEventListener('mouseleave', () => {
            isMouseDragging = false;
            this.track.style.cursor = 'grab';
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        this.track.style.cursor = 'grab';
    }

    createDots() {
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        const translateX = -index * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        this.updateDots();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(this.currentSlide);
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(this.currentSlide);
    }
}

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize first slider
    const slider1 = new HorizontalSlider('sliderTrack1', 'sliderDots1', 1);
    
    // Initialize second slider
    const slider2 = new HorizontalSlider('sliderTrack2', 'sliderDots2', 2);
});

// Smooth scroll to sections (optional navigation implementation)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Scroll-based animation for About section
function handleAboutScroll() {
    const aboutSection = document.querySelector('.about-section');
    const aboutLeft = document.querySelector('.about-left');
    const aboutRight = document.querySelector('.about-right');
    
    if (!aboutSection || !aboutLeft || !aboutRight) return;
    
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress (0 to 1)
    // Starts when section enters viewport, completes when it's centered
    const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.6)));
    
    if (scrollProgress > 0) {
        // Left side - slide from left (-300px to 0)
        const leftTransform = -300 + (scrollProgress * 300);
        aboutLeft.style.transform = `translateX(${leftTransform}px)`;
        
        // Right side - slide from right (300px to 0)
        const rightTransform = 300 - (scrollProgress * 300);
        aboutRight.style.transform = `translateX(${rightTransform}px)`;
    } else {
        // Reset when scrolled back up
        aboutLeft.style.transform = 'translateX(-300px)';
        aboutRight.style.transform = 'translateX(300px)';
    }
}

// Listen to scroll events
window.addEventListener('scroll', handleAboutScroll);

// Initial check on page load
window.addEventListener('load', handleAboutScroll);

// Add animation on scroll for work items
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

// Observe work items
document.querySelectorAll('.work-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});

// Button interactions
document.querySelectorAll('.contact-btn, .view-all-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple style dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Prevent horizontal scroll on body
document.body.style.overflowX = 'hidden';

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reset slider positions on resize
        document.querySelectorAll('.slider-track').forEach(track => {
            track.style.transform = 'translateX(0)';
        });
    }, 250);
});

// Preload optimization
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Smooth entrance animation
    document.querySelector('.hero-content').style.animation = 'fadeInUp 1s ease';
});

// Add entrance animation
const entranceStyle = document.createElement('style');
entranceStyle.textContent = `
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
`;
document.head.appendChild(entranceStyle);

console.log('🚀 Fullscreen scrolling website loaded successfully!');

// Smooth scrolling behavior - Natural flow like BBDO.com
// No wheel hijacking, just natural smooth scroll

