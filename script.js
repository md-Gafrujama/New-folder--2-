
      // Slider functionality
      const slider = document.querySelector(".hero-slider");
      const slides = document.querySelectorAll(".hero");
      const dots = document.querySelectorAll(".dot");
      const prevButton = document.querySelector(".prev");
      const nextButton = document.querySelector(".next");

      let currentSlide = 0;
      const slideCount = slides.length;

      function updateSlider() {
        // Hide current slide
        slides[currentSlide].style.opacity = "0";

        setTimeout(() => {
          // Move slider
          slider.style.transform = `translateX(-${currentSlide * 100}%)`;

          // Show new slide with animations
          slides.forEach((slide, index) => {
            if (index === currentSlide) {
              setTimeout(() => {
                slide.style.opacity = "1";
                slide.classList.add("active");
              }, 300);
            } else {
              slide.classList.remove("active");
            }
          });

          // Update dots
          dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
          });
        }, 300);
      }

      function nextSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
      }

      function prevSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
      }

      // Event listeners
      prevButton.addEventListener("click", prevSlide);
      nextButton.addEventListener("click", nextSlide);

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          if (currentSlide !== index) {
            slides[currentSlide].classList.remove("active");
            currentSlide = index;
            updateSlider();
          }
        });
      });

      // Event listeners
      prevButton.addEventListener("click", prevSlide);
      nextButton.addEventListener("click", nextSlide);

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          currentSlide = index;
          updateSlider();
        });
      });

      // Auto slide (every 5 seconds)
      const autoSlideInterval = setInterval(nextSlide, 5000);

      // Pause auto-slide on hover
      slider.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval);
      });

      // Smooth scroll for navigation
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
            });
          }
        });
      });

      // Add keyboard navigation for slider
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          prevSlide();
        } else if (e.key === "ArrowRight") {
          nextSlide();
        }
      });

      // Touch events for mobile swipe
      let touchStartX = 0;
      let touchEndX = 0;

      slider.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
      });

      slider.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
      });

      function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
          if (difference > 0) {
            // Swipe left
            nextSlide();
          } else {
            // Swipe right
            prevSlide();
          }
        }
      }

      // Form submission handling
      const contactForm = document.querySelector(".contact-form");
      if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
          e.preventDefault();
          // Add your form submission logic here
          alert("Form submitted successfully!");
          this.reset();
        });
      }

      // Initialize first slide
      updateSlider();

        // Service cards hover animation
        const serviceCards = document.querySelectorAll(".service-card");
        serviceCards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                card.style.transform = "translateY(-10px)";
                card.style.backgroundColor = "#f9f9f9";
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "translateY(0)";
                card.style.backgroundColor = "#ffffff";
            });
        });
        const readMoreBtn = document.getElementById('readMoreBtn');
        readMoreBtn.addEventListener('click', function() {
            this.style.transform = 'translateY(1px)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
            }, 100);
        });
        


        function startCounting() {
          document.querySelectorAll('.number').forEach(number => {
              const target = parseInt(number.getAttribute('data-target'));
              let count = 0;
              const increment = Math.ceil(target / 100);
              
              const updateNumber = () => {
                  count += increment;
                  if (count > target) count = target;
                  number.textContent = count;
                  if (count < target) requestAnimationFrame(updateNumber);
              };
              requestAnimationFrame(updateNumber);
          });
      }
      
      const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  startCounting();
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.5 });

      document.querySelectorAll('.stat').forEach(stat => observer.observe(stat));



  