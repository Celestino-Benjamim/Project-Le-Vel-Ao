(function () {
    const root = document.documentElement;
    let frameId;

    function getBreakpoint(width) {
        if (width <= 360) return 'compact';
        if (width <= 600) return 'mobile';
        if (width <= 1024) return 'tablet';
        if (width <= 1440) return 'desktop';
        return 'wide';
    }

    function updateLayoutMetrics() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const breakpoint = getBreakpoint(width);

        root.style.setProperty('--viewport-width', `${width}px`);
        root.style.setProperty('--viewport-height', `${height}px`);
        root.style.setProperty('--viewport-height-unit', `${height * 0.01}px`);
        root.dataset.breakpoint = breakpoint;

        frameId = undefined;
    }

    function markActiveNavigationLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.nav-header a[href]');

        links.forEach((link) => {
            const linkPage = link.getAttribute('href').split('#')[0];
            const isActive = linkPage === currentPage || (currentPage === 'index.html' && linkPage === '');
            link.classList.toggle('active', isActive);
            if (isActive) link.setAttribute('aria-current', 'page');
        });
    }

    function requestLayoutUpdate() {
        if (frameId === undefined) {
            frameId = window.requestAnimationFrame(updateLayoutMetrics);
        }
    }

    updateLayoutMetrics();
    markActiveNavigationLink();
    window.addEventListener('resize', requestLayoutUpdate, { passive: true });
    window.addEventListener('orientationchange', requestLayoutUpdate, { passive: true });
})();
