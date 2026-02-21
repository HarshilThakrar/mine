/* =========================================================
   PREMIUM NAVBAR - JAVASCRIPT
   Features: Theme Toggle, Search, Mobile Menu, Scroll Effects
   ========================================================= */

(function () {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', initNavbar);

    function initNavbar() {
        console.log('🚀 Premium Navbar initialized');

        // ===== ELEMENTS =====
        const navbar = document.getElementById('navbar');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        const themeToggle = document.getElementById('themeToggle');
        const searchToggle = document.getElementById('searchToggle');
        const searchOverlay = document.getElementById('searchOverlay');
        const searchClose = document.getElementById('searchClose');
        const searchInput = document.getElementById('searchInput');

        // ===== THEME TOGGLE =====

        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);

            // Add click animation
            themeToggle.style.transform = 'rotate(360deg) scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        }

        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            console.log(`🎨 Theme switched to: ${theme}`);
        }

        // ===== SEARCH FUNCTIONALITY =====

        if (searchToggle && searchOverlay) {
            searchToggle.addEventListener('click', openSearch);
        }

        if (searchClose) {
            searchClose.addEventListener('click', closeSearch);
        }

        if (searchOverlay) {
            // Close when clicking overlay background
            searchOverlay.addEventListener('click', (e) => {
                if (e.target === searchOverlay) {
                    closeSearch();
                }
            });
        }

        // Close search with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });

        function openSearch() {
            if (searchOverlay) {
                searchOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Focus input after animation
                setTimeout(() => {
                    if (searchInput) {
                        searchInput.focus();
                    }
                }, 100);
            }
        }

        function closeSearch() {
            if (searchOverlay) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';

                // Clear input
                if (searchInput) {
                    searchInput.value = '';
                }
            }
        }

        // Search input functionality (basic - can be enhanced)
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }

        function handleSearch(e) {
            const query = e.target.value.toLowerCase();
            console.log('🔍 Searching for:', query);

            // Here you can add real search logic
            // For now, just log the query
            // You could filter suggestions, make API calls, etc.
        }

        // Handle suggestion clicks
        const suggestionItems = document.querySelectorAll('.search-suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', () => {
                const searchTerm = item.textContent.trim();
                console.log('Selected suggestion:', searchTerm);

                // Here you would navigate to the search result
                // For example: window.location.href = '/search?q=' + encodeURIComponent(searchTerm);

                closeSearch();
            });
        });

        // ===== STICKY NAVBAR WITH SCROLL EFFECTS =====

        let lastScrollTop = 0;
        let scrollThreshold = 50;

        window.addEventListener('scroll', handleScroll);

        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add scrolled class when scrolling down
            if (scrollTop > scrollThreshold) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop;
        }

        // ===== MOBILE MENU TOGGLE =====

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        function toggleMobileMenu() {
            mobileMenuToggle?.classList.toggle('active');
            navMenu?.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navMenu?.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        // Close mobile menu when clicking on a link
        if (navMenu) {
            const navLinks = navMenu.querySelectorAll('.nav-link, .nav-cta-btn');
            navLinks.forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
        }

        function closeMobileMenu() {
            mobileMenuToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navbar && !navbar.contains(e.target) && navMenu?.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // ===== ACTIVE LINK HIGHLIGHTING =====

        updateActiveLink();

        function updateActiveLink() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const allNavLinks = document.querySelectorAll('.nav-link');

            allNavLinks.forEach(link => {
                const linkPage = link.getAttribute('href');

                // Remove active from all
                link.classList.remove('active');

                // Add active to current page
                if (linkPage === currentPage ||
                    (currentPage === '' && linkPage === 'index.html') ||
                    (currentPage === 'index.html' && linkPage === 'index.html')) {
                    link.classList.add('active');
                }
            });
        }

        // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleAnchorClick);
        });

        function handleAnchorClick(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    closeMobileMenu();
                }
            }
        }

        // ===== KEYBOARD SHORTCUTS =====

        document.addEventListener('keydown', handleKeyboardShortcuts);

        function handleKeyboardShortcuts(e) {
            // Ctrl/Cmd + K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openSearch();
            }

            // Ctrl/Cmd + D to toggle theme
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                toggleTheme();
            }
        }

        // ===== PERFORMANCE: DEBOUNCE SCROLL =====

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

        // Apply debounce to scroll for better performance
        const debouncedScroll = debounce(handleScroll, 10);
        window.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', debouncedScroll);

        // ===== INITIALIZATION COMPLETE =====

        console.log('✅ Premium Navbar ready');
        console.log('💡 Keyboard shortcuts: Ctrl+K (Search), Ctrl+D (Theme)');
    }

})();
