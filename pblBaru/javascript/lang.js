// const translations = {
//     'id': {
//         'title': 'Alumni POLNEP',
//         'about-polnep': 'Tentang POLNEP',
//         'academic': 'Akademik',
//         'library': 'Perpustakaan',
//         'login': 'Login',
//         'alumni-polnep': 'ALUMNI POLNEP',
//         'home': 'BERANDA',
//         'about': 'TENTANG',
//         'alumni': 'ALUMNI',
//         'achievements': 'PRESTASI',
//         'connect': 'CONNECT',
//         'directory': 'DIREKTORI',
//         'news-events': 'BERITA ACARA',
//         'news-release': 'Rilis Berita',
//         'news-1-title': 'Judul Berita 1',
//         'news-1-desc': 'Deskripsi singkat berita 1...',
//         'news-2-title': 'Judul Berita 2',
//         'news-2-desc': 'Deskripsi singkat berita 2...',
//         'news-3-title': 'Judul Berita 3',
//         'news-3-desc': 'Deskripsi singkat berita 3...',
//         'news-4-title': 'Judul Berita 4',
//         'news-4-desc': 'Deskripsi singkat berita 4...',
//         'news-5-title': 'Judul Berita 5',
//         'news-5-desc': 'Deskripsi singkat berita 5...',
//         'news-6-title': 'Judul Berita 6',
//         'news-6-desc': 'Deskripsi singkat berita 6...',
//         'social-media': 'Social Media',
//         'contact-service': 'Layanan Kontak',
//         'poster': 'Poster',
//         'polnep-logo': 'Logo POLNEP',
//         'graduation-banner': 'Banner Wisuda',
//         'news-1': 'Berita 1',
//         'news-2': 'Berita 2',
//         'news-3': 'Berita 3',
//         'news-4': 'Berita 4',
//         'news-5': 'Berita 5',
//         'news-6': 'Berita 6',
//         'footer-logo': 'Logo Footer'
//     },
//     'en': {
//         'title': 'POLNEP Alumni',
//         'about-polnep': 'About POLNEP',
//         'academic': 'Academic',
//         'library': 'Library',
//         'login': 'Login',
//         'alumni-polnep': 'POLNEP ALUMNI',
//         'home': 'HOME',
//         'about': 'ABOUT',
//         'alumni': 'ALUMNI',
//         'achievements': 'ACHIEVEMENTS',
//         'connect': 'CONNECT',
//         'directory': 'DIRECTORY',
//         'news-events': 'NEWS & EVENTS',
//         'news-release': 'News Release',
//         'news-1-title': 'News Title 1',
//         'news-1-desc': 'Brief description of news 1...',
//         'news-2-title': 'News Title 2',
//         'news-2-desc': 'Brief description of news 2...',
//         'news-3-title': 'News Title 3',
//         'news-3-desc': 'Brief description of news 3...',
//         'news-4-title': 'News Title 4',
//         'news-4-desc': 'Brief description of news 4...',
//         'news-5-title': 'News Title 5',
//         'news-5-desc': 'Brief description of news 5...',
//         'news-6-title': 'News Title 6',
//         'news-6-desc': 'Brief description of news 6...',
//         'social-media': 'Social Media',
//         'contact-service': 'Contact Service',
//         'poster': 'Poster',
//         'polnep-logo': 'POLNEP Logo',
//         'graduation-banner': 'Graduation Banner',
//         'news-1': 'News 1',
//         'news-2': 'News 2',
//         'news-3': 'News 3',
//         'news-4': 'News 4',
//         'news-5': 'News 5',
//         'news-6': 'News 6',
//         'footer-logo': 'Footer Logo'
//     }
// };

// function changeLanguage(lang) {
//     document.documentElement.lang = lang;
//     document.querySelectorAll('[data-lang]').forEach(elem => {
//         const key = elem.getAttribute('data-lang');
//         if (translations[lang] && translations[lang][key]) {
//             elem.textContent = translations[lang][key];
//         }
//     });

//     document.querySelectorAll('[data-lang-alt]').forEach(elem => {
//         const key = elem.getAttribute('data-lang-alt');
//         if (translations[lang] && translations[lang][key]) {
//             elem.alt = translations[lang][key];
//         }
//     });

//     const langToggle = document.getElementById('language-toggle');
//     langToggle.querySelector('span').textContent = lang.toUpperCase();

//     localStorage.setItem('language', lang);
// }

// document.getElementById('language-toggle').addEventListener('click', function(e) {
//     e.preventDefault();
//     const currentLang = this.querySelector('span').textContent.toLowerCase();
//     const newLang = currentLang === 'id' ? 'en' : 'id';
//     changeLanguage(newLang);
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const savedLang = localStorage.getItem('language') || 'id';
//     changeLanguage(savedLang);
// });

// // Existing JavaScript code
// window.addEventListener("load", function(){
//     setTimeout(
//         function open(event){
//             document.querySelector(".popup-container").style.display = "block";
//         },
//         500000000
//     )
// });

// document.querySelector("#close").addEventListener(
//     "click", function(){
//         document.querySelector(".popup-container").style.display = "none";
//     }
// );

// document.querySelector('.menu-toggle').addEventListener('click', function() {
//     document.querySelector('.main-nav').classList.toggle('responsive');
// });