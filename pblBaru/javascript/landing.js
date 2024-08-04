window.addEventListener("load", function () {
  setTimeout(function open(event) {
    document.querySelector(".popup-container").style.display = "block";
  }, 500000000);
});

document.querySelector("#close").addEventListener("click", function () {
  document.querySelector(".popup-container").style.display = "none";
});

document
  .getElementById("language-toggle")
  .addEventListener("click", function (e) {
    e.preventDefault();
    var langSpan = this.querySelector("span");
    if (langSpan.textContent === "ID") {
      langSpan.textContent = "EN";
      // Di sini Anda bisa menambahkan logika untuk mengubah konten ke bahasa Inggris
    } else {
      langSpan.textContent = "ID";
      // Di sini Anda bisa menambahkan logika untuk mengubah konten ke bahasa Indonesia
    }
  });

document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".main-nav").classList.toggle("responsive");
});
