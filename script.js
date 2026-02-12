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
const modalBeforeImage = document.getElementById('modalBeforeImage');
const modalAfterImage = document.getElementById('modalAfterImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');
const modalDate = document.getElementById('modalDate');
const modalArea = document.getElementById('modalArea');

// Work items data with before/after images
const workData = {
    1: {
        title: 'Modern Villa Bahçesi',
        beforeImage: 'hero.gif',
        afterImage: 'hero.gif',
        category: 'Villa Bahçesi',
        date: '2024',
        area: '350 m²',
        description: `
            <p>Modern villa bahçesi projemiz, minimalist tasarım anlayışı ile doğal materyallerin mükemmel uyumunu yansıtıyor. Proje öncesinde düzensiz ve bakımsız olan alan, şık ve işlevsel bir yaşam alanına dönüştürüldü.</p>
            <p>Doğal taş döşemeler, özenle seçilmiş bitki örtüsü ve modern peyzaj elemanları kullanılarak estetik ve fonksiyonel bir dış mekan tasarlandı.</p>
        `
    },
    2: {
        title: 'Kentsel Yeşil Alan',
        beforeImage: 'hero.gif',
        afterImage: 'hero.gif',
        category: 'Kentsel Peyzaj',
        date: '2024',
        area: '500 m²',
        description: `
            <p>Şehrin kalbinde yer alan bu proje, beton yığınları arasında doğal bir soluk aldırıyor. Modern kent yaşamının gerektirdiği işlevsellik ile doğanın huzuru bir araya getirildi.</p>
            <p>Sürdürülebilir peyzaj tasarımı ve yerel bitki türleri kullanılarak çevre dostu bir alan yaratıldı.</p>
        `
    },
    3: {
        title: 'Çatı Bahçesi Tasarımı',
        beforeImage: 'hero.gif',
        afterImage: 'hero.gif',
        category: 'Çatı Bahçesi',
        date: '2023',
        area: '180 m²',
        description: `
            <p>Yükseklerde yeşilin huzurunu yaşatan çatı bahçesi projemiz, sınırlı alanda maksimum yeşil alan yaratma hedefiyle tasarlandı.</p>
            <p>Hafif toprak sistemleri ve özel bitki seçimleri ile çatıya uygun, bakımı kolay ve estetik bir peyzaj oluşturuldu.</p>
        `
    },
    4: {
        title: 'Sürdürülebilir Peyzaj',
        beforeImage: 'hero.gif',
        afterImage: 'hero.gif',
        category: 'Sürdürülebilir Tasarım',
        date: '2023',
        area: '420 m²',
        description: `
            <p>Çevre dostu ve yenilikçi çözümlerle tasarlanan bu proje, su tasarrufu sağlayan sulama sistemleri ve yerel bitki türleri kullanımı ile dikkat çekiyor.</p>
            <p>Geri dönüşümlü malzemeler ve enerji verimli aydınlatma sistemleri ile sürdürülebilir bir peyzaj örneği oluşturuldu.</p>
        `
    },
    5: {
        title: 'İç Mekan Bitkilendirme',
        beforeImage: 'hero.gif',
        afterImage: 'hero.gif',
        category: 'İç Mekan Peyzajı',
        date: '2023',
        area: '200 m²',
        description: `
            <p>Ofis ve yaşam alanlarına yeşil dokunuş katarak iç mekan kalitesini artıran projemiz, modern iş hayatının stresini azaltmayı hedefliyor.</p>
            <p>Özel aydınlatma sistemleri ve düşük bakım gerektiren bitki türleri ile iç mekanlara doğal bir atmosfer kazandırıldı.</p>
        `
    },
    6: {
        title: 'Klasik Bahçe Restorasyonu',
        beforeImage: 'hero.gif',
        afterImage: 'hero.gif',
        category: 'Restorasyon',
        date: '2022',
        area: '600 m²',
        description: `
            <p>Geleneksel bahçe düzenlemesini modern yorumla harmanlayan restorasyon projemiz, tarihi dokuyu koruyarak çağdaş konfor standartlarını sunuyor.</p>
            <p>Klasik bahçe elemanları özenle restore edilirken, modern sulama ve aydınlatma sistemleri entegre edildi.</p>
        `
    }
};

// Before/After Slider Functionality
let isDragging = false;
let comparisonSlider = null;
let comparisonHandle = null;
let afterImage = null;

function initBeforeAfterSlider() {
    comparisonSlider = document.getElementById('comparisonSlider');
    comparisonHandle = document.getElementById('comparisonHandle');
    afterImage = document.querySelector('.after-image');
    
    if (!comparisonSlider || !comparisonHandle || !afterImage) return;

    // Mouse events
    comparisonHandle.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', onDragging);
    document.addEventListener('mouseup', stopDragging);

    // Touch events
    comparisonHandle.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', onDragging);
    document.addEventListener('touchend', stopDragging);

    // Click on slider to move handle
    comparisonSlider.addEventListener('click', (e) => {
        if (e.target === comparisonHandle || comparisonHandle.contains(e.target)) return;
        moveHandle(e);
    });
}

function startDragging(e) {
    isDragging = true;
    comparisonHandle.style.transition = 'none';
    e.preventDefault();
}

function stopDragging() {
    isDragging = false;
    comparisonHandle.style.transition = 'transform 0.2s ease';
}

function onDragging(e) {
    if (!isDragging) return;
    moveHandle(e);
}

function moveHandle(e) {
    const rect = comparisonSlider.getBoundingClientRect();
    const x = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    // Update handle position
    comparisonHandle.style.left = `${percentage}%`;
    
    // Update after image clip path
    afterImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
}

// Open modal function
function openWorkModal(workId) {
    const data = workData[workId];
    if (!data) return;

    modalBeforeImage.src = data.beforeImage;
    modalAfterImage.src = data.afterImage;
    modalTitle.textContent = data.title;
    modalDescription.innerHTML = data.description;
    modalCategory.textContent = data.category;
    modalDate.textContent = data.date;
    modalArea.textContent = data.area;

    workModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Initialize slider after modal opens
    setTimeout(() => {
        initBeforeAfterSlider();
    }, 100);
}

// Close modal function
function closeWorkModal() {
    workModal.classList.remove('active');
    document.body.style.overflow = '';
    isDragging = false;
}

// Add click events to work cards
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
        const workId = card.getAttribute('data-work');
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
    // Initialize services slider (was slider2, now the only slider)
    const servicesSlider = new HorizontalSlider('sliderTrack2', 'sliderDots2', 2);
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
    // Disable scroll animation on mobile for better performance
    if (window.innerWidth <= 768) {
        const aboutLeft = document.querySelector('.about-left');
        const aboutRight = document.querySelector('.about-right');
        if (aboutLeft) aboutLeft.style.transform = 'translateX(0)';
        if (aboutRight) aboutRight.style.transform = 'translateX(0)';
        return;
    }
    
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
const workObserverOptions = {
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
}, workObserverOptions);

// Observe work items
document.querySelectorAll('.work-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});

// Button interactions - Contact and View All
document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Scroll to contact section
        const contactSection = document.getElementById('section7');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.querySelectorAll('.view-all-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Scroll to first work section
        const workSection = document.getElementById('section3');
        if (workSection) {
            workSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
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

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');
const navbar = document.querySelector('.navbar');

// Show/hide back to top button and navbar scroll effect
window.addEventListener('scroll', () => {
    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Navbar background on scroll
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to top click
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== SCROLL PROGRESS INDICATOR =====
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ===== SMOOTH IMAGE LOADING =====
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
});

// ===== ENHANCED BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('.contact-btn, .view-all-btn, .slider-btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
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
document.head.appendChild(rippleStyle);

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('🚀 BY PLANT website loaded successfully!');
console.log('✨ All modern features activated!');

// Smooth scrolling behavior - Natural flow like BBDO.com
// No wheel hijacking, just natural smooth scroll

// ===== LOADING SCREEN & CURSOR REMOVED =====
// Loading screen ve custom cursor kaldırıldı

// ===== STATS COUNTER REMOVED =====
// İstatistik sayacı kaldırıldı

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle clicked item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== SCROLL ANIMATIONS FOR SECTIONS =====
const animatedSections = document.querySelectorAll('.stats-section, .faq-section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, { threshold: 0.1 });

animatedSections.forEach(section => {
    sectionObserver.observe(section);
});

// ===== HERO STAYS FIXED (NO PARALLAX) =====
// Hero artık sabit, hareket etmiyor

// ===== ENHANCED NAVBAR SCROLL =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
        
        // Hide on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ===== SMOOTH REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.about-title, .work-grid, .service-slide, .how-item, .contact-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    revealObserver.observe(el);
});

// ===== WHATSAPP BUTTON REMOVED =====
// WhatsApp butonu kaldırıldı

// ===== PERFORMANCE: DEBOUNCE SCROLL EVENTS =====
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

// Apply debounce to heavy scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Heavy scroll operations here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

console.log('✅ BY PLANT website loaded successfully!');
console.log('🎨 FAQ accordion, smooth animations - ACTIVE');
console.log('📱 Responsive design, optimized performance - READY');

