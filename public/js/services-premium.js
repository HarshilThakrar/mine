/* =========================================================
   PREMIUM SERVICES PAGE - INTERACTIVE FEATURES
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ===== PREMIUM NAVBAR FUNCTIONALITY =====
    // Handled by components/navbar-premium.js
    // ===== END NAVBAR FUNCTIONALITY =====


    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Handle hero "Explore Services" button
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                smoothScroll(href);
            }
        });
    });

    // ===== STICKY SIDE NAVIGATION =====
    const sidenavLinks = document.querySelectorAll('.sidenav-link');
    const serviceCards = document.querySelectorAll('.service-card-premium');

    // Update active state on scroll
    const updateActiveNav = () => {
        const scrollPosition = window.pageYOffset + 200;

        serviceCards.forEach((card, index) => {
            const cardTop = card.offsetTop;
            const cardBottom = cardTop + card.offsetHeight;

            if (scrollPosition >= cardTop && scrollPosition < cardBottom) {
                sidenavLinks.forEach(link => link.classList.remove('active'));
                sidenavLinks[index]?.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);

    // Side nav click handling
    sidenavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
        });
    });

    // ===== CATEGORY FILTER FUNCTIONALITY =====
    const filterTabs = document.querySelectorAll('.filter-tab');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;

            // Filter service cards
            serviceCards.forEach(card => {
                const cardCategory = card.dataset.category;

                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===== EXPANDABLE SERVICE DETAILS =====
    const expandButtons = document.querySelectorAll('.btn-expand');

    expandButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click

            const expandId = button.dataset.expand;
            const expandContent = document.getElementById(`expand-${expandId}`);

            if (expandContent) {
                const isOpen = expandContent.classList.contains('open');

                if (isOpen) {
                    expandContent.classList.remove('open');
                    button.classList.remove('expanded');
                } else {
                    expandContent.classList.add('open');
                    button.classList.add('expanded');
                }
            }
        });
    });

    // ===== CLICKABLE SERVICE CARDS =====
    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking button/link inside
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
                e.target.closest('a') || e.target.closest('button')) {
                return;
            }

            // Find the "Book Now" button and navigate
            const bookButton = card.querySelector('.btn-service-primary');
            if (bookButton) {
                window.location.href = bookButton.href;
            }
        });

        // Add hover cursor
        card.style.cursor = 'pointer';
    });

    // ===== SCROLL ANIMATIONS (Fade In on Scroll) =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // ===== FLOATING CTA VISIBILITY =====
    const floatingCta = document.querySelector('.floating-cta');
    const showFloatingCta = () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition > 800) {
            floatingCta.style.display = 'block';
        } else {
            floatingCta.style.display = 'none';
        }
    };

    window.addEventListener('scroll', showFloatingCta);

    // Floating CTA click
    const floatingCtaBtn = document.getElementById('floatingCta');
    if (floatingCtaBtn) {
        floatingCtaBtn.addEventListener('click', () => {
            // Scroll to final CTA or open contact form
            const finalCta = document.querySelector('.final-cta-section');
            if (finalCta) {
                smoothScroll('.final-cta-section');
            }
        });
    }

    // ===== ICON HOVER MICRO-ANIMATIONS =====
    const serviceIcons = document.querySelectorAll('.service-icon-premium');

    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const img = icon.querySelector('img');
            if (img) {
                img.style.animation = 'pulse 0.6s ease-in-out';
            }
        });

        icon.addEventListener('animationend', () => {
            const img = icon.querySelector('img');
            if (img) {
                img.style.animation = '';
            }
        });
    });

    // ===== PERFORMANCE: LAZY LOAD EXPANSION CONTENT =====
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const expandId = button.dataset.expand;
            const expandContent = document.getElementById(`expand-${expandId}`);

            if (expandContent && !expandContent.dataset.loaded) {
                expandContent.dataset.loaded = 'true';
                // Content is already in HTML, just mark as loaded
                // In a real app, you might fetch this via AJAX
            }
        });
    });

    // ===== HEADER NAVBAR ACTIVE STATE =====
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // ===== ANALYTICS/TRACKING (Placeholder) =====
    // Track service card views
    const trackCardView = (cardId) => {
        console.log(`Service card viewed: ${cardId}`);
        // In production: Send to analytics service
        // analytics.track('service_view', { service_id: cardId });
    };

    const cardViewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cardId = entry.target.id;
                trackCardView(cardId);
                cardViewObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    serviceCards.forEach(card => {
        if (card.id) {
            cardViewObserver.observe(card);
        }
    });

    // Track CTA clicks
    document.querySelectorAll('.btn-service-primary, .btn-hero-primary, .btn-cta-primary').forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();
            console.log(`CTA clicked: ${buttonText}`);
            // In production: analytics.track('cta_click', { button: buttonText });
        });
    });

    // ===== KEYBOARD NAVIGATION SUPPORT =====
    document.addEventListener('keydown', (e) => {
        // Escape to close expanded sections
        if (e.key === 'Escape') {
            document.querySelectorAll('.service-expanded-content.open').forEach(content => {
                content.classList.remove('open');
            });
            document.querySelectorAll('.btn-expand.expanded').forEach(button => {
                button.classList.remove('expanded');
            });
        }
    });

    // ===== PREVENT DOUBLE-CLICK ZOOM ON MOBILE =====
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // ===== INITIAL SETUP =====
    // Show all services initially
    serviceCards.forEach(card => {
        card.style.display = 'block';
    });

    // Hide floating CTA initially
    if (floatingCta) {
        floatingCta.style.display = 'none';
    }

    // Trigger initial nav update
    updateActiveNav();

    console.log('Premium Services page initialized ✨');

});

// ===== EXTERNAL UTILITIES =====

// Debounce helper for scroll events
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

// Apply debounce to scroll handlers for better performance
window.addEventListener('scroll', debounce(() => {
    // Your optimized scroll handler
}, 100));
