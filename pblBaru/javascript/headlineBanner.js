document.addEventListener('DOMContentLoaded', function() {
    const bannerContainer = document.querySelector('.headline-banner-container');
    const banner = document.querySelector('.headline-banner');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    let currentIndex = 0;
    const banners = [
        '../pblBaru/images/headlineBanner.png',
        // Tambahkan URL gambar banner lainnya di sini
    ];

    function updateBanner() {
        banner.querySelector('img').src = banners[currentIndex];
    }

    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + banners.length) % banners.length;
        updateBanner();
    });

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % banners.length;
        updateBanner();
    });
});