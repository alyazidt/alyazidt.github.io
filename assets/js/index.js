/*!
=========================================================
* Meyawo Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function () {
  $(".navbar .nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        700,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

// navbar toggle
$("#nav-toggle").click(function () {
  $(this).toggleClass("is-active");
  $("ul.nav").toggleClass("show");
});

function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

/**
 * Init typed.js
 */
// const typed = document.querySelector('.typed');
// if (typed) {
//   let typed_strings = typed.getAttribute('data-typed-items');
//   typed_strings = typed_strings.split(', ');
//   new Typed('.typed', {
//     strings: typed_strings,
//     typeSpeed: 100,
//     backSpeed: 50,
//     backDelay: 2000,
//     loop: true
//   });
// }

// document.addEventListener("DOMContentLoaded", function () {
//     new Typed(".typed", {
//       strings: ["Designer", "Developer", "Freelancer", "Photographer"],
//       typeSpeed: 60,
//       backSpeed: 40,
//       backDelay: 1500,
//       loop: true
//     });
//   });

// document.addEventListener("DOMContentLoaded", function () {
//     new Typed(".typed", {
//       strings: [
//         '<span class="font-1">Designer</span>',
//         '<span class="font-2">Developer</span>',
//         '<span class="font-3">Freelancer</span>',
//         '<span class="font-4">Photographer</span>'
//       ],
//       typeSpeed: 60,
//       backSpeed: 40,
//       backDelay: 1500,
//       loop: true,
//       contentType: 'html'
//     });
//   });

const fonts = [
  "font-1",
  "font-2",
  "font-3",
  "font-4",
  "font-5",
  "font-6",
  "font-7",
  "font-8",
  "font-9",
  "font-10",
  "font-11",
  "font-12",
  "font-13",
  "font-14",
  "font-15",
  "font-16",
  "font-17",
  "font-18",
  "font-19",
  "font-20",
];

const typed = new Typed(".typed", {
  strings: [
    "Software Engineering",
    "Web Developer",
    "Freelancer",
    "Mobile Application Developer",
    "Full Stack Developer",
    "Freelancer",
    "Coder",
    "Programmer",
    "Frontend Developer",
    "Backend Developer",
  ],
  typeSpeed: 100,
  backSpeed: 50,
  loop: true,
  preStringTyped: function (arrayPos, self) {
    const typedSpan = document.querySelector(".typed");
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    typedSpan.className = `typed ${randomFont}`;
  },
});
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav");
  const navItems = document.querySelectorAll(".nav .item a");

  // فتح وغلق القائمة بالزر
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // غلق القائمة عند الضغط على أي عنصر من nav
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });

  // غلق القائمة عند التمرير (scroll)
  window.addEventListener("scroll", () => {
    if (navMenu.classList.contains("show")) {
      navMenu.classList.remove("show");
    }
  });
});
