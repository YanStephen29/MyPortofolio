document.addEventListener('DOMContentLoaded', function() {
    initializeLoadingScreen();
    initializeFiltering();
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
    initializeKeyboardShortcuts();
    initializePerformanceOptimizations();
    initializeAdvancedEffects();
    initializeParticles();
    initializeMagneticEffect();
    initializeProgressIndicator();
    initializeTextAnimations();
    initializeDynamicTextEffects();
    initializeNameTypingEffect();
    
    console.log('Portfolio initialized successfully! 🚀');
});

// =========== INITIALIZATION FUNCTIONS ===========

function initializeAnimations() {
    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
            }
        });
    }, observerOptions);

    // Observe scroll reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Timeline animation with stagger effect
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.timeline-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.2 });

    const timelineSection = document.querySelector('#organizations');
    if (timelineSection) {
        timelineObserver.observe(timelineSection);
    }

    // Skill cards animation
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link
                updateActiveNavLink(this.getAttribute('href'));
            }
        });
    });

    // Mobile menu toggle (if exists)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
}

function initializeScrollEffects() {
    // Dynamic navbar background on scroll
    const navbar = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Navbar background
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        // Keep navbar always visible
        navbar.style.transform = 'translateY(0)';
        
        lastScrollY = currentScrollY;

        // Update active section in navigation
        updateActiveSection();
        
        // Parallax effect for hero background elements
        parallaxEffect();
    });
}

function initializePerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });

    // Preload critical resources
    preloadCriticalResources();
    
    // Service worker registration (if available)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    }
}

// =========== UTILITY FUNCTIONS ===========

function updateActiveNavLink(href) {
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 200 && sectionTop + sectionHeight > 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

function preloadCriticalResources() {
    const criticalImages = [
        'assets/images/profile-photo.jpg',
        'assets/images/cover.png',
        'assets/images/smart-parking.jpg',
        'assets/images/cover_py.jpg',
        'assets/images/ml4.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// =========== THEME MANAGEMENT ===========

const ThemeManager = {
    init() {
        this.loadTheme();
        this.setupThemeToggle();
    },
    
    loadTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    },
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Animate theme transition
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    },
    
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
};

// =========== ADVANCED FEATURES ===========

// Easter egg functionality
function initializeEasterEggs() {
    let konami = [];
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    document.addEventListener('keydown', (e) => {
        konami.push(e.keyCode);
        if (konami.length > konamiCode.length) {
            konami.shift();
        }
        
        if (JSON.stringify(konami) === JSON.stringify(konamiCode)) {
            activateEasterEgg();
        }
    });
}

function activateEasterEgg() {
    // Add special effects
    document.body.classList.add('konami-active');
    
    // Create floating elements
    for (let i = 0; i < 20; i++) {
        createFloatingElement();
    }
    
    setTimeout(() => {
        document.body.classList.remove('konami-active');
        document.querySelectorAll('.floating-easter').forEach(el => el.remove());
    }, 5000);
}

function createFloatingElement() {
    const element = document.createElement('div');
    element.className = 'floating-easter';
    element.innerHTML = '🚀';
    element.style.cssText = `
        position: fixed;
        z-index: 9999;
        font-size: 2rem;
        pointer-events: none;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        animation: floatUp 3s linear forwards;
    `;
    
    document.body.appendChild(element);
    
    setTimeout(() => element.remove(), 3000);
}

// Performance monitoring
const PerformanceMonitor = {
    init() {
        this.measurePageLoad();
        this.setupPerformanceObserver();
    },
    
    measurePageLoad() {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        });
    },
    
    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'navigation') {
                        console.log('Navigation timing:', entry);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['navigation', 'paint'] });
        }
    }
};

// =========== ADVANCED EFFECTS ===========

function initializeAdvancedEffects() {
    // Parallax effect for background elements
    initializeParallax();
    
    // 3D tilt effect for cards
    initialize3DTilt();
    
    // Typing animation for hero text
    initializeTypingAnimation();
    
    // Skill progress bars animation
    initializeSkillBars();
    
    // Cursor trail effect
    initializeCursorTrail();
}

function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

function initialize3DTilt() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

function initializeTypingAnimation() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #3b82f6';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    });
}

function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percentage = bar.getAttribute('data-percentage') || '75';
                setTimeout(() => {
                    bar.style.transform = `translateX(-${100 - percentage}%)`;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

function initializeCursorTrail() {
    let mouseX = 0, mouseY = 0;
    let trailElements = [];
    
    // Create trail elements
    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(59, 130, 246, ${0.8 - i * 0.15});
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease-out;
        `;
        document.body.appendChild(trail);
        trailElements.push(trail);
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX, y = mouseY;
        
        trailElements.forEach((trail, index) => {
            trail.style.left = x - 4 + 'px';
            trail.style.top = y - 4 + 'px';
            trail.style.transform = `scale(${1 - index * 0.15})`;
            
            x += (mouseX - x) * 0.3;
            y += (mouseY - y) * 0.3;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

function initializeParticles() {
    const heroSection = document.querySelector('#home');
    if (!heroSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    heroSection.appendChild(particlesContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 3 + 2;
        
        particle.style.cssText = `
            left: ${startX}px;
            bottom: -10px;
            width: ${size}px;
            height: ${size}px;
            animation: float-particle ${duration}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);
}

function initializeMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.15;
            const moveY = y * 0.15;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Add smooth reveal animation for elements
function initializeStaggeredAnimations() {
    const staggerElements = document.querySelectorAll('.stagger-animation');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-fade-in-up');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });
    
    staggerElements.forEach(element => observer.observe(element));
}

// Enhanced scroll reveal with different directions
function enhanceScrollReveal() {
    const leftElements = document.querySelectorAll('.scroll-reveal-left');
    const rightElements = document.querySelectorAll('.scroll-reveal-right');
    const scaleElements = document.querySelectorAll('.scroll-reveal-scale');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.2 });
    
    [...leftElements, ...rightElements, ...scaleElements].forEach(el => {
        observer.observe(el);
    });
}

// Initialize advanced scroll effects
function initializeAdvancedScrollEffects() {
    enhanceScrollReveal();
    initializeStaggeredAnimations();
}

// Call advanced effects initialization
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initializeAdvancedScrollEffects();
    }, 500);
});

// =========== LOADING SCREEN AND UI ENHANCEMENTS ===========

function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            // Remove loading screen from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000); // Show loading for at least 1 second
    });
}

function initializeProgressIndicator() {
    const progressIndicator = document.getElementById('progress-indicator');
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        progressIndicator.style.width = `${progress}%`;
    }
    
    window.addEventListener('scroll', updateProgress);
}

// Enhanced theme management (updated)
const AdvancedThemeManager = {
    init() {
        this.createThemeToggle();
        this.loadTheme();
    },
    
    createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌙';
        themeToggle.id = 'theme-toggle';
        themeToggle.className = 'theme-toggle fixed bottom-6 right-6 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-xl hover:bg-slate-700 transition-all duration-300 z-50 magnetic';
        themeToggle.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(themeToggle);
    },
    
    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Update toggle button
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.innerHTML = isLight ? '☀️' : '🌙';
        }
        
        // Add smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    },
    
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            // Update button icon if it exists
            setTimeout(() => {
                const toggle = document.getElementById('theme-toggle');
                if (toggle) {
                    toggle.innerHTML = '☀️';
                }
            }, 100);
        }
    }
};

// Enhanced interaction effects
function addInteractionEffects() {
    // Add click ripple effect to buttons
    document.querySelectorAll('.ripple').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// CSS for ripple animation
const rippleCSS = `
@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add ripple CSS to document
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// =========== SPECIAL NAME TYPING EFFECT ===========

function initializeNameTypingEffect() {
    const nameElement = document.getElementById('typing-name');
    if (!nameElement || nameElement.dataset.typingInitialized === 'true') return;
    
    // Mark as initialized to prevent repeated execution
    nameElement.dataset.typingInitialized = 'true';
    
    const fullName = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.style.width = '0';
    
    // Start typing effect after a brief delay
    setTimeout(() => {
        typeNameEffect(nameElement, fullName);
    }, 1500); // Delay to let other animations settle
}

function typeNameEffect(element, text) {
    let charIndex = 0;
    const typingSpeed = 120; // Slower for more dramatic effect
    
    function typeChar() {
        if (charIndex < text.length) {
            element.textContent += text.charAt(charIndex);
            charIndex++;
            
            // Adjust width dynamically
            element.style.width = 'auto';
            
            // Add some variation in typing speed
            const nextDelay = typingSpeed + Math.random() * 50;
            setTimeout(typeChar, nextDelay);
        } else {
            // Typing complete - show cursor and prepare for restart
            setTimeout(() => {
                element.classList.add('typing-complete');
                
                // Add a flash effect to indicate completion
                element.style.textShadow = '0 0 30px rgba(59, 130, 246, 0.8)';
                setTimeout(() => {
                    element.style.textShadow = '0 0 30px rgba(59, 130, 246, 0.3)';
                }, 300);
                
                // Wait 3 seconds then restart the typing effect
                setTimeout(() => {
                    restartTypingEffect(element, text);
                }, 3000);
                
            }, 1000);
        }
    }
    
    typeChar();
}

function restartTypingEffect(element, text) {
    // Clear the text with a deleting effect
    let currentText = element.textContent;
    let deleteIndex = currentText.length;
    
    function deleteChar() {
        if (deleteIndex > 0) {
            element.textContent = currentText.substring(0, deleteIndex - 1);
            deleteIndex--;
            setTimeout(deleteChar, 50); // Faster deletion
        } else {
            // Text cleared, restart typing
            element.classList.remove('typing-complete');
            element.style.borderRight = '3px solid rgba(59, 130, 246, 0.8)';
            element.style.animation = 'blink-cursor 1s infinite';
            
            setTimeout(() => {
                typeNameEffect(element, text);
            }, 500);
        }
    }
    
    deleteChar();
}

// Enhanced description with highlighted words
function enhanceDescriptionText() {
    const descriptionElement = document.querySelector('.enhanced-description');
    if (!descriptionElement) return;
    
    const highlightWords = [
        'Computer Science',
        'Web Development', 
        'Machine Learning',
        'Mobile App Development',
        'IoT Development'
    ];
    
    let htmlContent = descriptionElement.innerHTML;
    
    highlightWords.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        htmlContent = htmlContent.replace(regex, '<span class="highlight-word">$1</span>');
    });
    
    descriptionElement.innerHTML = htmlContent;
    
    // Add stagger animation to highlighted words
    const highlightedElements = descriptionElement.querySelectorAll('.highlight-word');
    highlightedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('animate-fade-in');
    });
}

// Improved portfolio title cycling
function improvePortfolioTitleEffect() {
    const logoElement = document.querySelector('.hero-gradient.animated-text-3d');
    if (!logoElement) return;
    
    let currentEffect = 0;
    const effects = [
        { class: 'hero-gradient', duration: 4000 },
        { class: 'holographic-text', duration: 3000 },
        { class: 'retro-wave', duration: 3500 },
        { class: 'neon-glow', duration: 4000 }
    ];
    
    function cycleEffect() {
        const effect = effects[currentEffect];
        logoElement.className = `${effect.class} animated-text-3d`;
        
        currentEffect = (currentEffect + 1) % effects.length;
        setTimeout(cycleEffect, effect.duration);
    }
    
    // Start cycling after initial load
    setTimeout(cycleEffect, 2000);
}

// Add smooth reveal animations for cards
function addCardRevealAnimations() {
    const cards = document.querySelectorAll('.aesthetic-card, .card-hover');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize all aesthetic improvements
function initializeAestheticImprovements() {
    setTimeout(() => {
        enhanceDescriptionText();
        improvePortfolioTitleEffect();
        addCardRevealAnimations();
        addFloatingElementsBackground();
    }, 500);
}

// Add floating geometric elements in background
function addFloatingElementsBackground() {
    const heroSection = document.querySelector('#home');
    if (!heroSection) return;
    
    const geometricShapes = ['circle', 'triangle', 'square', 'diamond'];
    
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        const shapeType = geometricShapes[Math.floor(Math.random() * geometricShapes.length)];
        
        shape.className = `floating-shape floating-shape-${shapeType}`;
        shape.style.cssText = `
            position: absolute;
            width: ${Math.random() * 30 + 10}px;
            height: ${Math.random() * 30 + 10}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            background: rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1});
            border-radius: ${shapeType === 'circle' ? '50%' : '0'};
            animation: float-geometric ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
            z-index: 1;
        `;
        
        if (shapeType === 'triangle') {
            shape.style.background = 'transparent';
            shape.style.borderLeft = '15px solid transparent';
            shape.style.borderRight = '15px solid transparent';
            shape.style.borderBottom = '20px solid rgba(139, 92, 246, 0.2)';
            shape.style.width = '0';
            shape.style.height = '0';
        }
        
        heroSection.appendChild(shape);
    }
}

// Add floating animation CSS
const floatingShapesCSS = `
@keyframes float-geometric {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.3;
    }
    25% {
        transform: translateY(-20px) rotate(90deg);
        opacity: 0.6;
    }
    50% {
        transform: translateY(-10px) rotate(180deg);
        opacity: 0.4;
    }
    75% {
        transform: translateY(-30px) rotate(270deg);
        opacity: 0.7;
    }
}
`;

// Add floating shapes CSS to document
const floatingStyle = document.createElement('style');
floatingStyle.textContent = floatingShapesCSS;
document.head.appendChild(floatingStyle);

// =========== ADVANCED TEXT ANIMATIONS ===========

function initializeTextAnimations() {
    // Create dynamic text effect switcher for logo
    const logoElement = document.querySelector('.hero-gradient');
    if (logoElement) {
        let currentEffect = 0;
        const effects = [
            'hero-gradient',
            'holographic-text',
            'retro-wave',
            'cyberpunk-text',
            'matrix-text'
        ];
        
        // Switch text effects every 5 seconds
        setInterval(() => {
            logoElement.className = effects[currentEffect] + ' animated-text-3d';
            currentEffect = (currentEffect + 1) % effects.length;
        }, 5000);
    }
}

function initializeDynamicTextEffects() {
    // Add typing effect to specific elements
    addTypingEffect();
    
    // Add text reveal animation
    addTextRevealAnimation();
    
    // Add character animation
    addCharacterAnimation();
}

function addTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #3b82f6';
        
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    });
}

function addTextRevealAnimation() {
    const revealElements = document.querySelectorAll('.text-reveal-animation');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                element.innerHTML = '';
                
                // Split text into characters
                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.opacity = '0';
                    span.style.transform = 'translateY(50px)';
                    span.style.transition = `all 0.5s ease ${index * 0.05}s`;
                    element.appendChild(span);
                    
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, 100);
                });
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => observer.observe(el));
}

function addCharacterAnimation() {
    const animatedElements = document.querySelectorAll('.character-animation');
    
    animatedElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.animation = `character-bounce 2s ease-in-out infinite`;
            span.style.animationDelay = `${index * 0.1}s`;
            element.appendChild(span);
        });
    });
}

// Add CSS for character animation
const characterAnimationCSS = `
@keyframes character-bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

@keyframes character-wave {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
    }
    25% {
        transform: translateY(-10px) rotate(-5deg);
    }
    75% {
        transform: translateY(-5px) rotate(5deg);
    }
}

@keyframes character-glow {
    0%, 100% {
        text-shadow: 0 0 5px currentColor;
        color: inherit;
    }
    50% {
        text-shadow: 0 0 20px #3b82f6, 0 0 30px #8b5cf6;
        color: #3b82f6;
    }
}
`;

// Interactive text effects on hover
function addInteractiveTextEffects() {
    const interactiveTexts = document.querySelectorAll('.interactive-text');
    
    interactiveTexts.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'character-glow 0.5s ease-in-out';
            
            // Add glitch effect temporarily
            element.classList.add('glitch-text');
            element.setAttribute('data-text', element.textContent);
            
            setTimeout(() => {
                element.classList.remove('glitch-text');
                element.removeAttribute('data-text');
            }, 1000);
        });
    });
}

// Particle text effect
function createParticleText(element) {
    const text = element.textContent;
    const rect = element.getBoundingClientRect();
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = rect.top + 'px';
    particleContainer.style.left = rect.left + 'px';
    particleContainer.style.width = rect.width + 'px';
    particleContainer.style.height = rect.height + 'px';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1000';
    
    document.body.appendChild(particleContainer);
    
    // Create particles for each character
    text.split('').forEach((char, index) => {
        if (char.trim()) {
            const particle = document.createElement('div');
            particle.textContent = char;
            particle.style.position = 'absolute';
            particle.style.left = (index * (rect.width / text.length)) + 'px';
            particle.style.top = '0px';
            particle.style.color = '#3b82f6';
            particle.style.fontWeight = 'bold';
            particle.style.animation = `particle-float 2s ease-out forwards`;
            particle.style.animationDelay = `${index * 0.1}s`;
            
            particleContainer.appendChild(particle);
        }
    });
    
    // Remove particle container after animation
    setTimeout(() => {
        particleContainer.remove();
    }, 3000);
}

// Add particle float animation
const particleTextCSS = `
@keyframes particle-float {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-100px) scale(0.5);
    }
}
`;

// Add all text animation CSS to document
const textAnimationStyle = document.createElement('style');
textAnimationStyle.textContent = characterAnimationCSS + particleTextCSS;
document.head.appendChild(textAnimationStyle);

// Initialize interactive effects
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        addInteractiveTextEffects();
    }, 1000);
});

// Initialize advanced features
document.addEventListener('DOMContentLoaded', () => {
    AdvancedThemeManager.init();
    addInteractionEffects();
    initializeEasterEggs();
    PerformanceMonitor.init();
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
    // You could send this to an error tracking service
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Clean up any running animations or intervals
    document.querySelectorAll('.animated').forEach(el => {
        el.style.animation = 'none';
    });
});
