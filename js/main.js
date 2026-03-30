/**
 * Main – Vanilla JS (replaces jQuery-heavy main.js)
 * - Scroll animations via IntersectionObserver
 * - Smooth-scroll anchor links
 * - Page loader
 * - GLightbox gallery
 * - Parallax scroll effect
 */
(function () {
  'use strict';

  // ── Scroll animations ──
  function initAnimations() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      var boxes = document.querySelectorAll('.animate-box');
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.opacity = '1';
        boxes[i].classList.add('animated');
      }
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var effect = el.getAttribute('data-animate') || 'fadeInUp';
            el.classList.add('animate__animated', 'animate__' + effect, 'animated');
            el.style.opacity = '1';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    var animateBoxes = document.querySelectorAll('.animate-box');
    for (var j = 0; j < animateBoxes.length; j++) {
      observer.observe(animateBoxes[j]);
    }
  }

  // ── Smooth scroll for anchor links ──
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var targetId = link.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ── Parallax scroll effect ──
  function initParallax() {
    var sections = document.querySelectorAll('.parallax-bg');
    if (!sections.length) return;

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var scrollY = window.pageYOffset;
          for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var rect = section.getBoundingClientRect();
            var sectionTop = rect.top + scrollY;
            var offset = (scrollY - sectionTop) * 0.35;
            section.style.backgroundPositionY = 'calc(50% + ' + offset + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Rolling Gallery ──
  function initGallery() {
    var mainImg = document.getElementById('galleryMainImg');
    var mainLink = document.getElementById('galleryMainLink');
    var thumbstrip = document.getElementById('galleryThumbstrip');
    var progressBar = document.getElementById('galleryProgressBar');
    if (!mainImg || !thumbstrip) return;

    var thumbs = thumbstrip.querySelectorAll('.gallery-thumb');
    var images = [];
    for (var i = 0; i < thumbs.length; i++) {
      images.push(thumbs[i].src);
    }

    var current = 0;
    var autoInterval = 4000; // ms between slides
    var timer = null;
    var progressTimer = null;
    var progressStart = 0;

    function showImage(index, animate) {
      if (index < 0) index = images.length - 1;
      if (index >= images.length) index = 0;
      current = index;

      if (animate) {
        mainImg.classList.add('fading');
        setTimeout(function () {
          mainImg.src = images[current];
          if (mainLink) mainLink.href = images[current];
          mainImg.classList.remove('fading');
        }, 300);
      } else {
        mainImg.src = images[current];
        if (mainLink) mainLink.href = images[current];
      }

      // Update active thumb
      for (var j = 0; j < thumbs.length; j++) {
        thumbs[j].classList.toggle('active', j === current);
      }

      // Scroll active thumb into view within the strip (without moving the page)
      var activeTh = thumbs[current];
      if (activeTh && thumbstrip) {
        var stripW = thumbstrip.clientWidth;
        var thumbLeft = activeTh.offsetLeft;
        var thumbW = activeTh.offsetWidth;
        thumbstrip.scrollTo({ left: thumbLeft - stripW / 2 + thumbW / 2, behavior: 'smooth' });
      }
    }

    // Progress bar animation
    function startProgress() {
      if (progressBar) progressBar.style.width = '0%';
      progressStart = Date.now();
      clearInterval(progressTimer);
      progressTimer = setInterval(function () {
        var elapsed = Date.now() - progressStart;
        var pct = Math.min((elapsed / autoInterval) * 100, 100);
        if (progressBar) progressBar.style.width = pct + '%';
      }, 50);
    }

    // Auto-rolling
    function startAuto() {
      stopAuto();
      startProgress();
      timer = setInterval(function () {
        showImage(current + 1, true);
        startProgress();
      }, autoInterval);
    }

    function stopAuto() {
      clearInterval(timer);
      clearInterval(progressTimer);
      if (progressBar) progressBar.style.width = '0%';
    }

    function resetAuto() {
      stopAuto();
      startAuto();
    }

    // Thumbnail clicks
    for (var k = 0; k < thumbs.length; k++) {
      thumbs[k].addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'), 10);
        showImage(idx, true);
        resetAuto();
      });
    }

    // Navigation arrows
    var prevBtn = document.querySelector('.gallery-prev');
    var nextBtn = document.querySelector('.gallery-next');
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        showImage(current - 1, true);
        resetAuto();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        showImage(current + 1, true);
        resetAuto();
      });
    }

    // Touch / swipe support on main image
    var touchStartX = 0;
    mainImg.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    mainImg.addEventListener('touchend', function (e) {
      var diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 50) {
        showImage(diff > 0 ? current - 1 : current + 1, true);
        resetAuto();
      }
    }, { passive: true });

    // Pause on hover
    var showcase = document.querySelector('.gallery-showcase');
    if (showcase) {
      showcase.addEventListener('mouseenter', stopAuto);
      showcase.addEventListener('mouseleave', startAuto);
    }

    // Init GLightbox with all images for fullscreen view
    var lightbox = null;
    if (typeof GLightbox !== 'undefined') {
      var glightboxElements = [];
      for (var g = 0; g < images.length; g++) {
        glightboxElements.push({ href: images[g], type: 'image' });
      }
      lightbox = GLightbox({
        elements: glightboxElements,
        touchNavigation: true,
        loop: true,
        closeOnOutsideClick: true,
        openEffect: 'fade',
        closeEffect: 'fade',
        autoplayVideos: false,
      });
    }

    // Open lightbox at the current image on main image click
    if (mainLink) {
      mainLink.addEventListener('click', function (e) {
        e.preventDefault();
        if (lightbox) {
          lightbox.openAt(current);
        }
      });
    }

    // Start
    showImage(0, false);
    startAuto();
  }

  // ── Page loader ──
  function hideLoader() {
    var loader = document.getElementById('pageLoader');
    if (!loader) return;

    loader.classList.add('hidden');
    setTimeout(function () {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 600);
  }

  // ── Init ──
  document.addEventListener('DOMContentLoaded', function () {
    initAnimations();
    initSmoothScroll();
    initParallax();
    initGallery();
    hideLoader();
  });
})();
