// ===================================
// Hero Slideshow
// ===================================
let slideIndex = 1;
let slideInterval;

// ===================================
// Fix for iOS viewport height
// ===================================
function setVhVariable() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set on load
setVhVariable();

// Update on resize and orientation change
window.addEventListener('resize', setVhVariable);
window.addEventListener('orientationchange', setVhVariable);

// ===================================
// Sticky Discount Banner Close
// ===================================
const stickyDiscount = document.getElementById('stickyDiscount');
const stickyClose = document.getElementById('stickyClose');

if (stickyClose) {
    stickyClose.addEventListener('click', (e) => {
        e.stopPropagation();
        stickyDiscount.classList.add('hidden');
    });
}

function currentSlide(n) {
    slideIndex = n;
    showSlides();
    resetSlideInterval();
}

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

function nextSlide() {
    slideIndex++;
    showSlides();
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
}

// Initialize slideshow with first slide
document.addEventListener('DOMContentLoaded', () => {
    showSlides();
    resetSlideInterval();
    startHeroTextAnimation();
});

// ===================================
// Hero Text Animation
// ===================================
const heroTexts = [
    'Elegance Šitá Na Míru',
    'Kvalita Každého Stehu',
    'Precizní Krejčovská Práce',
    'Vaše Oblečení, Náš Styl'
];

let currentTextIndex = 0;

function startHeroTextAnimation() {
    const heroTitle = document.getElementById('heroTitle');
    if (!heroTitle) return;

    setInterval(() => {
        // Fade out
        heroTitle.classList.remove('fade-in');
        heroTitle.classList.add('fade-out');
        
        setTimeout(() => {
            // Change text
            currentTextIndex = (currentTextIndex + 1) % heroTexts.length;
            heroTitle.textContent = heroTexts[currentTextIndex];
            
            // Fade in
            heroTitle.classList.remove('fade-out');
            heroTitle.classList.add('fade-in');
        }, 500);
    }, 8000); // Change every 8 seconds
}

// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const menuOverlay = document.getElementById('menuOverlay');

function openMobileMenu() {
    menuToggle.classList.add('active');
    navMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = 'auto';
}

menuToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

// Close button in mobile menu
if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

// Close when clicking overlay
if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMobileMenu);
}

// Mobile dropdown toggle
const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
dropdownItems.forEach(item => {
    const toggleBtn = item.querySelector('.dropdown-arrow-btn');
    const textSpan = item.querySelector('.nav-link-text');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            item.classList.toggle('active');
        });
    }
    
    if (textSpan) {
        textSpan.addEventListener('click', (e) => {
            // Scroll to services
            const targetSection = document.querySelector('#services');
            if (targetSection) {
                if (navMenu.classList.contains('active')) {
                    closeMobileMenu();
                    setTimeout(() => {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }, 400);
                } else {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Check if this is a dropdown link
        const isDropdownParent = link.closest('.nav-item-dropdown') && link.classList.contains('nav-link') && link.parentElement.classList.contains('nav-item-dropdown');
        
        // If it's dropdown parent in mobile, don't navigate (handled above)
        if (isDropdownParent && navMenu.classList.contains('active')) {
            return;
        }
        
        // Always prevent default for anchor links
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            
            // Close menu if it's open (mobile view)
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
                
                // Then scroll after menu close animation
                setTimeout(() => {
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }, 400);
            } else {
                // Desktop view - scroll immediately
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
});

// Smooth Scrolling for Navigation Links (desktop)
const desktopLinks = document.querySelectorAll('.nav-link');
desktopLinks.forEach(link => {
    // Remove duplicate event listener - already handled above
});

// Navbar Scroll Effect and Info Bar Behavior
const navbar = document.getElementById('navbar');
const infoBar = document.getElementById('infoBar');
const mottoBar = document.getElementById('mottoBar');
let lastScroll = 0;

// Získat skutečné výšky z DOM
function getBarHeights() {
    const infoBarHeight = infoBar ? infoBar.offsetHeight : 32;
    const navbarHeight = navbar ? navbar.offsetHeight : 106;
    const mottoBarInitialTop = infoBarHeight + navbarHeight;
    
    return { infoBarHeight, navbarHeight, mottoBarInitialTop };
}

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const { infoBarHeight, navbarHeight, mottoBarInitialTop } = getBarHeights();
    
    // Plynulé schovávání podle scrollu
    if (currentScroll <= mottoBarInitialTop) {
        // Info bar se schovává první
        infoBar.style.top = `${Math.max(-infoBarHeight, -currentScroll)}px`;
        
        // Navbar se posouvá nahoru s info barem
        navbar.style.top = `${Math.max(0, infoBarHeight - currentScroll)}px`;
        
        // Motto bar se také posouvá nahoru
        mottoBar.style.top = `${Math.max(0, mottoBarInitialTop - currentScroll)}px`;
    } else {
        // Po scrollu vše schované/na pozici
        infoBar.style.top = `-${infoBarHeight}px`;
        navbar.style.top = `0px`;
        mottoBar.style.top = `0px`;
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Gallery Item Hover Effect Enhancement
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(0.98)';
        this.style.transition = 'transform 0.4s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Smooth scroll to top on logo click
const logo = document.querySelector('.logo');

logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effect for buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Disable right-click on images (optional - for protecting gallery images)
/*
const images = document.querySelectorAll('.gallery-image, .about-image');
images.forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
*/

// Auto-hide scroll indicator after scrolling
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100 && scrollIndicator) {
        scrollIndicator.style.opacity = '0';
    } else if (scrollIndicator) {
        scrollIndicator.style.opacity = '1';
    }
});

// Add year to footer automatically
const footerBottom = document.querySelector('.footer-bottom p');
if (footerBottom) {
    const currentYear = new Date().getFullYear();
    footerBottom.textContent = `© ${currentYear} Alibaba Krejčovství.`;
}

// ===================================
// Scroll to Top Button
// ===================================
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top when clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});