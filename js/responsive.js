// =========== RESPONSIVE INTERACTION HANDLER ===========

class ResponsivePortfolio {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.detectDevice();
    }

    init() {
        this.createMobileNavigation();
        this.initializeTouchGestures();
        this.setupViewportHandling();
        this.initializeResponsiveAnimations();
        this.setupAccessibility();
    }

    // =========== MOBILE NAVIGATION ===========
    createMobileNavigation() {
        const nav = document.querySelector('nav');
        const navList = nav.querySelector('ul');
        
        // Create mobile menu button
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Create mobile navigation
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <div class="mobile-nav-header">
                <h3 class="text-xl font-bold text-sky-400 mb-4">Navigation</h3>
            </div>
            <ul class="mobile-nav-links">
                ${navList.innerHTML}
            </ul>
        `;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        
        // Insert elements
        nav.appendChild(mobileMenuButton);
        document.body.appendChild(mobileNav);
        document.body.appendChild(overlay);
        
        // Add event listeners
        mobileMenuButton.addEventListener('click', () => this.toggleMobileNav());
        overlay.addEventListener('click', () => this.closeMobileNav());
        
        // Close nav when clicking on links
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileNav();
                // Smooth scroll after closing nav
                setTimeout(() => {
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            });
        });
    }

    toggleMobileNav() {
        const button = document.querySelector('.mobile-menu-button');
        const nav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.mobile-nav-overlay');
        
        button.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scroll when nav is open
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileNav() {
        const button = document.querySelector('.mobile-menu-button');
        const nav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.mobile-nav-overlay');
        
        button.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // =========== TOUCH GESTURES ===========
    initializeTouchGestures() {
        // Swipe to close mobile nav
        let startX, startY;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const nav = document.querySelector('.mobile-nav');
            if (!nav.classList.contains('active')) return;
            
            const diffX = startX - e.touches[0].clientX;
            const diffY = startY - e.touches[0].clientY;
            
            // Swipe left to close nav
            if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
                this.closeMobileNav();
            }
        });
        
        // Touch feedback for interactive elements
        this.addTouchFeedback();
    }

    addTouchFeedback() {
        const interactiveElements = document.querySelectorAll(
            '.project-card, .skill-card, .filter-btn, .timeline-item, a, button'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
                this.style.transition = '';
            });
        });
    }

    // =========== VIEWPORT HANDLING ===========
    setupViewportHandling() {
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.adjustForOrientation();
                this.recalculateLayout();
            }, 100);
        });
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Initial setup
        this.adjustForOrientation();
    }

    adjustForOrientation() {
        const isLandscape = window.innerHeight < window.innerWidth;
        const isSmallScreen = window.innerWidth < 768;
        
        if (isLandscape && isSmallScreen) {
            document.body.classList.add('landscape-mobile');
            this.optimizeForLandscape();
        } else {
            document.body.classList.remove('landscape-mobile');
        }
    }

    optimizeForLandscape() {
        // Reduce hero section height in landscape mode
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            heroSection.style.paddingTop = '2rem';
            heroSection.style.paddingBottom = '2rem';
        }
    }

    handleResize() {
        // Close mobile nav on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileNav();
        }
        
        // Recalculate element positions
        this.recalculateLayout();
        
        // Update responsive text sizes
        this.updateResponsiveText();
    }

    recalculateLayout() {
        // Recalculate any absolute positioned elements
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            // Reset any inline styles that might interfere
            if (window.innerWidth <= 768) {
                const hidden = item.querySelector('.hidden');
                const absolute = item.querySelector('.absolute');
                
                if (hidden) hidden.style.display = 'block';
                if (absolute) {
                    absolute.style.position = 'relative';
                    absolute.style.left = 'auto';
                    absolute.style.transform = 'none';
                }
            }
        });
    }

    // =========== DEVICE DETECTION ===========
    detectDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768;
        const isTouch = 'ontouchstart' in window;
        
        document.body.classList.toggle('is-mobile', isMobile);
        document.body.classList.toggle('is-tablet', isTablet);
        document.body.classList.toggle('is-touch', isTouch);
        
        // Optimize for device type
        if (isMobile) {
            this.optimizeForMobile();
        } else if (isTablet) {
            this.optimizeForTablet();
        }
    }

    optimizeForMobile() {
        // Reduce animation complexity on mobile
        const style = document.createElement('style');
        style.textContent = `
            .is-mobile .floating-sphere {
                animation-duration: 4s;
            }
            .is-mobile .particle {
                display: none;
            }
            .is-mobile .enhanced-bg::before {
                animation: none;
            }
        `;
        document.head.appendChild(style);
    }

    optimizeForTablet() {
        // Tablet-specific optimizations
        document.body.classList.add('tablet-optimized');
    }

    // =========== RESPONSIVE ANIMATIONS ===========
    initializeResponsiveAnimations() {
        // Intersection Observer for responsive animations
        const observerOptions = {
            threshold: window.innerWidth < 768 ? 0.1 : 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add stagger effect for grouped elements
                    const siblings = entry.target.parentElement.children;
                    const index = Array.from(siblings).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            });
        }, observerOptions);

        // Observe elements with reduced motion check
        const elementsToAnimate = document.querySelectorAll(
            '.scroll-reveal, .skill-card, .project-card, .timeline-item'
        );
        
        elementsToAnimate.forEach(element => {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                observer.observe(element);
            } else {
                element.classList.add('animate-in');
            }
        });
    }

    // =========== ACCESSIBILITY ===========
    setupAccessibility() {
        // Skip link
        this.addSkipLink();
        
        // Focus management
        this.setupFocusManagement();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Screen reader announcements
        this.setupScreenReaderSupport();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #3b82f6;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupFocusManagement() {
        // Trap focus in mobile nav when open
        const mobileNav = document.querySelector('.mobile-nav');
        const focusableElements = 'a, button, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && mobileNav.classList.contains('active')) {
                const focusable = mobileNav.querySelectorAll(focusableElements);
                const firstFocusable = focusable[0];
                const lastFocusable = focusable[focusable.length - 1];
                
                if (e.shiftKey && document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }

    setupKeyboardNavigation() {
        // Escape key to close mobile nav
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileNav();
                
                // Close any open modals
                const modals = document.querySelectorAll('.modal.active');
                modals.forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });
        
        // Arrow key navigation for filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach((button, index) => {
            button.addEventListener('keydown', (e) => {
                let targetIndex;
                
                switch(e.key) {
                    case 'ArrowLeft':
                        targetIndex = index > 0 ? index - 1 : filterButtons.length - 1;
                        break;
                    case 'ArrowRight':
                        targetIndex = index < filterButtons.length - 1 ? index + 1 : 0;
                        break;
                    default:
                        return;
                }
                
                e.preventDefault();
                filterButtons[targetIndex].focus();
            });
        });
    }

    setupScreenReaderSupport() {
        // Add screen reader announcements for dynamic content
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        document.body.appendChild(announcer);
        
        // Announce when filters change
        document.addEventListener('filterChanged', (e) => {
            announcer.textContent = `Showing ${e.detail.count} projects in ${e.detail.category} category`;
        });
    }

    // =========== TEXT RESPONSIVENESS ===========
    updateResponsiveText() {
        const textElements = document.querySelectorAll('[class*="text-responsive"]');
        textElements.forEach(element => {
            // Force reflow to update clamp() values
            element.style.display = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.display = '';
        });
    }

    // =========== PERFORMANCE OPTIMIZATION ===========
    optimizePerformance() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Debounce scroll events
        this.debounceScrollEvents();
        
        // Preload critical resources
        this.preloadCriticalResources();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    debounceScrollEvents() {
        let ticking = false;
        
        function updateScrollEffects() {
            // Update progress indicator
            const progressIndicator = document.getElementById('progress-indicator');
            if (progressIndicator) {
                const scrollTop = window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (scrollTop / docHeight) * 100;
                progressIndicator.style.width = `${progress}%`;
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    preloadCriticalResources() {
        // Preload fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }

    // =========== EVENT LISTENERS ===========
    setupEventListeners() {
        // Global event listeners
        window.addEventListener('load', () => {
            this.optimizePerformance();
        });
        
        // Custom events
        document.addEventListener('portfolioReady', () => {
            console.log('Portfolio responsive system ready! 📱💻');
        });
        
        // Dispatch ready event
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('portfolioReady'));
        }, 100);
    }
}

// =========== RESPONSIVE UTILITIES ===========

class ResponsiveUtils {
    static getBreakpoint() {
        const width = window.innerWidth;
        if (width < 480) return 'xs';
        if (width < 768) return 'sm';
        if (width < 1024) return 'md';
        if (width < 1280) return 'lg';
        if (width < 1536) return 'xl';
        return '2xl';
    }
    
    static isMobile() {
        return window.innerWidth < 768;
    }
    
    static isTablet() {
        return window.innerWidth >= 768 && window.innerWidth < 1024;
    }
    
    static isDesktop() {
        return window.innerWidth >= 1024;
    }
    
    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    static getViewportHeight() {
        return window.innerHeight || document.documentElement.clientHeight;
    }
    
    static getViewportWidth() {
        return window.innerWidth || document.documentElement.clientWidth;
    }
    
    static scrollToElement(element, offset = 80) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// =========== INITIALIZATION ===========

// Initialize responsive portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.responsivePortfolio = new ResponsivePortfolio();
    window.ResponsiveUtils = ResponsiveUtils;
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ResponsivePortfolio, ResponsiveUtils };
}
