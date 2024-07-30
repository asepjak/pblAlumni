document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Add active class to current page link
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-links a');
    const menuLength = menuItems.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItems[i].href === currentLocation) {
            menuItems[i].classList.add('active');
        }
    }

    // Scroll to show/hide main nav
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            document.querySelector('.main-nav').style.top = '-80px';
        } else {
            document.querySelector('.main-nav').style.top = '0';
        }
        lastScrollTop = scrollTop;
    });
});