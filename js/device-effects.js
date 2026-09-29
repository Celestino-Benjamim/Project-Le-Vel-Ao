(function () {
    const root = document.documentElement;
    const mobileQuery = window.matchMedia('(max-width: 650px)');
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function updateDeviceMode() {
        const isMobile = mobileQuery.matches || touchQuery.matches;
        const shouldReduceMotion = isMobile || reducedMotionQuery.matches;

        root.classList.toggle('mobile-device', isMobile);
        root.classList.toggle('reduced-motion', shouldReduceMotion);
        root.dataset.device = isMobile ? 'mobile' : 'desktop';
    }

    updateDeviceMode();
    mobileQuery.addEventListener('change', updateDeviceMode);
    touchQuery.addEventListener('change', updateDeviceMode);
    reducedMotionQuery.addEventListener('change', updateDeviceMode);
})();
