const continueBtn = document.getElementById("continueBtn");
const slider = document.querySelector(".left-slider");

if (continueBtn && slider) {
  continueBtn.addEventListener("click", () => {
    slider.classList.add("slide-next");
  });
}

const backBtn = document.querySelector('.global-back-btn');
if (backBtn) {
  backBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.history.length > 1 ? window.history.back() : window.location.href = '/';
  });
}



// Hero typing effect script
console.log("MineHR Solutions website loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {

  // Text to type (^ = new line)
  const fullText = "Automate payroll, compliance, attendance, and employee management -^all from one powerful platform.";

  // Get required elements
  const typingElement = document.getElementById("hero-typing-text");
  const signatureElement = document.getElementById("hero-signature");
  const cursorElement = document.getElementById("hero-cursor");

  // Stop if main element not found
  if (!typingElement) {
    console.warn("hero-typing-text element not found!");
    return;
  }

  // Current character index
  let charIndex = 0;

  // Types text character by character
  function typeText() {
    if (charIndex < fullText.length) {
      const char = fullText.charAt(charIndex);

      // Handle line break symbol
      if (char === "^") {
        typingElement.innerHTML += "<br>";
      } else {
        typingElement.innerHTML += char;
      }

      charIndex++;
      setTimeout(typeText, 30); // Typing speed
    } else {
      // Hide cursor and show signature
      if (cursorElement) cursorElement.style.display = "none";
      if (signatureElement) {
        setTimeout(() => {
          signatureElement.style.opacity = "1";
        }, 500);
      }
    }
  }

  // Clear text and start typing
  typingElement.innerHTML = "";
  setTimeout(typeText, 500);
});


// Stats counting animation script

const counters = document.querySelectorAll(".stat-number");
let started = false;

function startCounting() {
  if (started) return;

  const section = document.querySelector(".stats-section");
  const sectionTop = section.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight - 100) {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const isPercent = counter.nextElementSibling.textContent.includes("%");
      let count = 0;

      const increment = target / 100;

      const updateCounter = () => {
        count += increment;
        if (count < target) {
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
          if (counter.getAttribute("data-target") == "1800") {
            counter.textContent = "1.8K+";
          }
          if (counter.getAttribute("data-target") == "48") {
            counter.textContent = "48%+";
          }
          if (counter.getAttribute("data-target") == "11") {
            counter.textContent = "11+";
          }
          if (counter.getAttribute("data-target") == "3") {
            counter.textContent = "3";
          }
        }
      };

      updateCounter();
    });

    started = true;
  }
}

window.addEventListener("scroll", startCounting);



// Infinite Horizontal Scroll for Services (NO CLONING - Pure CSS Animation)
document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".services-scroll-container");
  if (!scrollContainer) return;

  // Don't clone anything - use the original 9 cards only
  const originalCards = Array.from(scrollContainer.children);

  // Calculate total scrollable width
  const gap = 42; // from CSS
  const cardWidth = 280;
  const totalWidth = originalCards.length * (cardWidth + gap);

  let scrollSpeed = 1; // Pixels per frame
  let isHovered = false;
  let isTouching = false;

  // Pause scrolling when user hovers
  scrollContainer.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  scrollContainer.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  // Pause scrolling when user touches
  scrollContainer.addEventListener("touchstart", () => {
    isTouching = true;
  });

  scrollContainer.addEventListener("touchend", () => {
    isTouching = false;
  });

  function infiniteScroll() {
    if (!isHovered && !isTouching) {
      scrollContainer.scrollLeft += scrollSpeed;

      // When we reach the end of the 9 cards, loop back to start
      // This creates the infinite scrolling effect
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollLeft = 0;
      }
    }

    requestAnimationFrame(infiniteScroll);
  }

  // Start the animation
  requestAnimationFrame(infiniteScroll);
});

