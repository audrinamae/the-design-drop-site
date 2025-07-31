let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const totalSlides = slides.length;
let isScrolling = false;

const portfolioData = [
  {
    number: "01 / 03",
    title: "Visual Branding",
    subheader: "Brand Identity & Design",
    tagline: "Build a look that lasts.",
    description: "From customs logos to business cards and brand kits, I create visuals that tell your story and leave a lasting impression.",
    coverstitle: "Such As",
    covers: "Logos, Business cards, color pallets, fonts, moodboards & more."
  },
  {
    number: "02 / 03",
    title: "Digital Spaces",
    subheader: "Website Builds & Design",
    tagline: "Your digital home, done right.",
    description: "Whether you're starting from scratch or refreshing your current site, I design sleek, responsive websites that reflect your brand and convert visitors into clients.",
    coverstitle: "Such As:",
    covers: "Full site builds, one-pagers, Wordpress, mobile optimization, Domain Hosting, etc.."
  },
  {
    number: "03 / 03",
    title: "Creative Support",
    subheader: "Consulting & Troubleshooting",
    tagline: "Smart support when you need it most.",
    description: "Need a second set of eyes or a quick fix? I offer consultations and hands-on troubleshooting to get your project back on track—fast with enhanced performance.",
    coverstitle: "Such As",
    covers: "Design help, bug fixes, layout feedback, beginner guidance, SEO optimization & much more!"
  }
];

function updateContent(index) {
  const data = portfolioData[index];
  const elements = [
    "portfolioNumber",
    "portfolioTitle",
    "portfolioSubheader",
    "portfolioTagline",
    "portfolioDescription",
    "portfolioCoversTitle",
    "portfolioCovers"
  ];

  // Add exit animation to current content
  elements.forEach((id) => {
    document.getElementById(id).style.animation = "fadeOutDown 0.4s ease-in forwards";
  });

  // Update content and trigger enter animations after exit
  setTimeout(() => {
    document.getElementById("portfolioNumber").textContent = data.number;
    document.getElementById("portfolioTitle").textContent = data.title;
    document.getElementById("portfolioSubheader").textContent = data.subheader;
    document.getElementById("portfolioTagline").textContent = data.tagline;
    document.getElementById("portfolioDescription").textContent = data.description;
    document.getElementById("portfolioCoversTitle").textContent = data.coverstitle;
    document.getElementById("portfolioCovers").textContent = data.covers;

    // Trigger enter animations
    document.getElementById("portfolioNumber").style.animation = "slideInFromTop 0.8s ease-out 0.2s forwards";
    document.getElementById("portfolioTitle").style.animation = "bounceIn 1s ease-out 0.4s forwards";
    document.getElementById("portfolioSubheader").style.animation = "fadeInUp 0.8s ease-out 0.45s forwards";
    document.getElementById("portfolioTagline").style.animation = "fadeInUp 0.8s ease-out 0.5s forwards";
    document.getElementById("portfolioDescription").style.animation = "fadeInUp 0.8s ease-out 0.6s forwards";
    document.getElementById("portfolioCoversTitle").style.animation = "fadeInUp 0.8s ease-out 0.7s forwards";
    document.getElementById("portfolioCovers").style.animation = "fadeInUp 0.8s ease-out 0.7s forwards";
  }, 400);
}

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  updateContent(index);
  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % totalSlides;
  showSlide(next);
}

function prevSlide() {
  const prev = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(prev);
}

// Scroll event
window.addEventListener("wheel", (e) => {
  if (isScrolling) return;
  isScrolling = true;

  if (e.deltaY > 0) {
    nextSlide();
  } else {
    prevSlide();
  }

  setTimeout(() => {
    isScrolling = false;
  }, 800);
});

// Touch events
let touchStartY = 0;
window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});
window.addEventListener("touchend", (e) => {
  if (isScrolling) return;
  const touchEndY = e.changedTouches[0].clientY;
  const diff = touchStartY - touchEndY;

  if (Math.abs(diff) > 50) {
    isScrolling = true;

    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }
});

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (!isScrolling) {
      showSlide(index);
    }
  });
});

// Keyboard navigation
window.addEventListener("keydown", (e) => {
  if (isScrolling) return;
  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
    prevSlide();
  }
});

// Auto-advance
setInterval(nextSlide, 6000);

// Initialize first slide
document.addEventListener("DOMContentLoaded", () => {
  showSlide(0);
});