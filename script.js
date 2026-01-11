// Hamburger Menu Animation
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
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

// Scroll Indicator fade out on scroll
const sectionsContainer = document.querySelector('.sections-container');
const scrollIndicator = document.querySelector('.scroll-indicator');

sectionsContainer.addEventListener('scroll', () => {
    if (sectionsContainer.scrollTop > 100) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
});

// Smooth scroll to sections (optional navigation implementation)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Parallax effect on hero section
const heroSection = document.querySelector('.hero-section');
const heroContent = document.querySelector('.hero-content');

sectionsContainer.addEventListener('scroll', () => {
    const scrolled = sectionsContainer.scrollTop;
    const sectionHeight = heroSection.offsetHeight;
    
    if (scrolled < sectionHeight) {
        const parallaxSpeed = 0.5;
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

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

// Smooth wheel scrolling
let isScrolling = false;
let scrollTimeout;

sectionsContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    if (isScrolling) return;
    
    isScrolling = true;
    
    // Smooth scroll with easing
    const delta = Math.sign(e.deltaY);
    const scrollAmount = delta * window.innerHeight;
    const startPosition = sectionsContainer.scrollTop;
    const targetPosition = startPosition + scrollAmount;
    const duration = 800; // Smooth transition duration in ms
    const startTime = performance.now();
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);
        
        sectionsContainer.scrollTop = startPosition + (scrollAmount * easeProgress);
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        } else {
            isScrolling = false;
        }
    }
    
    requestAnimationFrame(animateScroll);
    
    // Reset scrolling flag after duration
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, duration + 100);
}, { passive: false });
