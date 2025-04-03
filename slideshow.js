/**
 * Ultra-optimized slideshow.js
 * This script handles the slideshow functionality with minimal resource usage
 */

// Optimized slideshow implementation with minimal DOM access
(function() {
    // Define variables in function scope to avoid polluting global namespace
    let slideIndex = 0;
    let slideshowPaused = false;
    let slideshowInterval = null;
    let isInViewport = false;
    
    // Preload next slide images to avoid flicker on change
    function preloadSlideImages() {
      const slides = document.querySelectorAll('.slide:not([data-preloaded])');
      slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img && img.getAttribute('loading') === 'lazy') {
          // Create a new image object to preload the image
          const preloadImg = new Image();
          preloadImg.src = img.src || img.dataset.src;
          
          // Once preloaded, mark the slide
          preloadImg.onload = () => {
            slide.setAttribute('data-preloaded', 'true');
          };
        }
      });
    }
    
    // Optimize slide switching with minimal reflows
    function showSlides() {
      if (slideshowPaused || !isInViewport) return;
      
      const slides = document.querySelectorAll('.slide');
      if (!slides.length) return;
      
      // Hide current slides in batch for better performance
      slides.forEach(slide => {
        slide.style.display = 'none';
      });
      
      // Increment slide index with validation
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      
      // Show only the current slide (single DOM manipulation)
      slides[slideIndex - 1].style.display = 'block';
    }
    
    // Start slideshow with optimized timer
    function startSlideshow() {
      if (slideshowInterval) return;
      
      // Show initial slide
      showSlides();
      
      // Use requestAnimationFrame for smoother timing that respects browser optimization
      let lastTime = 0;
      const interval = 5000; // 5 seconds between slides
      
      function animationLoop(timestamp) {
        if (!lastTime) lastTime = timestamp;
        
        const elapsed = timestamp - lastTime;
        
        if (elapsed >= interval) {
          showSlides();
          lastTime = timestamp;
        }
        
        // Only request another frame if slideshow is active
        if (!slideshowPaused) {
          slideshowInterval = requestAnimationFrame(animationLoop);
        }
      }
      
      slideshowInterval = requestAnimationFrame(animationLoop);
    }
    
    // Stop slideshow to conserve resources
    function stopSlideshow() {
      if (slideshowInterval) {
        cancelAnimationFrame(slideshowInterval);
        slideshowInterval = null;
      }
      slideshowPaused = true;
    }
    
    // Resume slideshow
    function resumeSlideshow() {
      slideshowPaused = false;
      if (!slideshowInterval && isInViewport) {
        startSlideshow();
      }
    }
    
    // Use Intersection Observer to only run slideshow when visible
    function initializeVisibilityTracking() {
      if (!('IntersectionObserver' in window)) {
        // Fallback for browsers without IntersectionObserver
        isInViewport = true;
        startSlideshow();
        return;
      }
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            isInViewport = entry.isIntersecting;
            
            if (entry.isIntersecting) {
              resumeSlideshow();
              // Preload next images while visible
              preloadSlideImages();
            } else {
              stopSlideshow();
            }
          });
        },
        {
          root: null, // Use viewport as root
          rootMargin: '0px',
          threshold: 0.1 // 10% visibility is enough to start
        }
      );
      
      const slideshowContainer = document.querySelector('.slideshow-container');
      if (slideshowContainer) {
        observer.observe(slideshowContainer);
        
        // Add mouse interactions for user experience
        slideshowContainer.addEventListener('mouseenter', () => {
          slideshowPaused = true;
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
          slideshowPaused = false;
          if (isInViewport && !slideshowInterval) {
            startSlideshow();
          }
        });
        
        // Optimize for mobile
        slideshowContainer.addEventListener('touchstart', () => {
          slideshowPaused = true;
        });
        
        slideshowContainer.addEventListener('touchend', () => {
          slideshowPaused = false;
          setTimeout(() => {
            if (isInViewport && !slideshowInterval) {
              startSlideshow();
            }
          }, 1000); // Small delay after touch to avoid immediate slide change
        });
      }
    }
    
    // Initialize slideshow when DOM is loaded, but with minimal initial processing
    function initSlideshow() {
      // Ensure all slides except first are hidden initially
      const slides = document.querySelectorAll('.slide');
      slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'block' : 'none';
      });
      
      // Initialize visibility tracking
      initializeVisibilityTracking();
      
      // Add page visibility change detection to pause slideshow when tab is inactive
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          stopSlideshow();
        } else if (isInViewport) {
          resumeSlideshow();
        }
      });
      
      // Handle window resize efficiently with debounce
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          // Check if slideshow is still visible after resize
          const slideshowContainer = document.querySelector('.slideshow-container');
          if (slideshowContainer) {
            const rect = slideshowContainer.getBoundingClientRect();
            isInViewport = (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= window.innerHeight &&
              rect.right <= window.innerWidth
            );
            
            if (isInViewport) {
              resumeSlideshow();
            } else {
              stopSlideshow();
            }
          }
        }, 250); // 250ms debounce
      });
    }
    
    // Delay slideshow initialization until after critical content is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initSlideshow, 100);
      });
    } else {
      setTimeout(initSlideshow, 100);
    }
  })();
  
  /**
   * Timeline animation optimized for performance
   */
  (function() {
    function initializeTimeline() {
      const timelineContainers = document.querySelectorAll('.timeline-container');
      if (!timelineContainers.length) return;
      
      // Use Intersection Observer for better performance
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Add small staggered delay based on index for nicer animation
              const index = Array.from(timelineContainers).indexOf(entry.target);
              entry.target.style.transitionDelay = `${index * 100}ms`;
              entry.target.classList.add('show');
              
              // Once animated, no need to observe anymore
              observer.unobserve(entry.target);
            }
          });
        }, { 
          threshold: 0.15,
          rootMargin: '0px 0px -10% 0px' // Trigger a bit before item comes into full view
        });
        
        timelineContainers.forEach(container => {
          observer.observe(container);
        });
      } else {
        // Fallback for browsers without IntersectionObserver
        timelineContainers.forEach(container => {
          container.classList.add('show');
        });
      }
    }
    
    // Initialize when needed
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeTimeline);
    } else {
      initializeTimeline();
    }
  })();
  
  /**
   * Utility functions for UI elements - with performance optimizations
   */
  (function() {
    // Setup back to top button with debounced scroll handling
    function setupBackToTop() {
      const backToTopButton = document.getElementById("backToTop");
      if (!backToTopButton) return;
      
      // Use passive event listener for better scroll performance
      let lastKnownScrollY = 0;
      let ticking = false;
      
      function update() {
        if (lastKnownScrollY > 300) {
          backToTopButton.classList.add("visible");
        } else {
          backToTopButton.classList.remove("visible");
        }
        ticking = false;
      }
      
      window.addEventListener("scroll", function() {
        lastKnownScrollY = window.scrollY;
        
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      }, { passive: true });
      
      // Smooth scroll with optimized animation
      backToTopButton.addEventListener("click", function(e) {
        e.preventDefault();
        
        const startPosition = window.scrollY;
        const startTime = performance.now();
        const duration = 500; // ms
        
        function scrollStep(timestamp) {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smoother animation
          const easeInOutQuad = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          
          window.scrollTo(0, startPosition * (1 - easeInOutQuad));
          
          if (elapsed < duration) {
            requestAnimationFrame(scrollStep);
          }
        }
        
        requestAnimationFrame(scrollStep);
      });
    }
    
    // Optimize image loading
    function optimizeImageLoading() {
      // Use native lazy loading if available
      if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
          img.setAttribute('loading', 'lazy');
        });
      } 
      // Use Intersection Observer as fallback
      else if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const srcset = img.getAttribute('data-srcset');
              const src = img.getAttribute('data-src');
              
              if (srcset) {
                img.srcset = srcset;
                img.removeAttribute('data-srcset');
              }
              
              if (src) {
                img.src = src;
                img.removeAttribute('data-src');
              }
              
              img.classList.add('loaded');
              imageObserver.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px', // Load images a bit before they come into view
          threshold: 0.01
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
          imageObserver.observe(img);
        });
      }
    }
    
    // Initialize all utilities with delayed execution for non-critical functions
    function initializeUtilities() {
      // Set up critical UI elements immediately
      setupBackToTop();
      
      // Delay non-critical optimizations
      setTimeout(optimizeImageLoading, 200);
    }
    
    // Initialize utilities on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeUtilities);
    } else {
      initializeUtilities();
    }
  })();
  
  // Remove loader once page is fully loaded - critical for perceived performance
  window.addEventListener('load', function() {
    requestAnimationFrame(() => {
      const loader = document.querySelector('.loader');
      if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 300);
      }
    });
  }, { once: true }); // Use once option to auto-remove event listener after execution

// Dark mode toggle functionality
// Dark mode toggle functionality - add this to your slideshow.js file
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
      // Check for saved preference on load
      if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
      }
      
      themeToggle.addEventListener('click', function() {
        // Toggle dark mode class specifically on the body
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
        
        // Debug output to console
        console.log('Dark mode toggled, new state:', isDarkMode);
      });
    }
  });