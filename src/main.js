document.addEventListener('DOMContentLoaded', () => {
  // Sticky navbar transform logic
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('open');
      });
    });
  }

  // Scroll animations observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });

  // Services tab switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.services-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update active button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active panel
      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === targetId) {
          panel.classList.add('active');
        }
      });
    });
  });

  // Before & After comparison slider logic
  const container = document.querySelector('.before-after-container');
  const sliderBar = document.querySelector('.before-after-slider-bar');
  const beforeImg = document.querySelector('.before-after-slider-img.img-before');

  if (container && sliderBar && beforeImg) {
    let isDragging = false;

    const drag = (e) => {
      if (!isDragging) return;
      const rect = container.getBoundingClientRect();
      let x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      
      // Keep x within bounds
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;

      const percentage = (x / rect.width) * 100;
      sliderBar.style.left = `${percentage}%`;
      beforeImg.style.width = `${percentage}%`;
    };

    const startDrag = () => { isDragging = true; };
    const stopDrag = () => { isDragging = false; };

    sliderBar.addEventListener('mousedown', startDrag);
    sliderBar.addEventListener('touchstart', startDrag);
    
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
    
    container.addEventListener('mousemove', drag);
    container.addEventListener('touchmove', drag);
  }

  // Gift Card interaction
  const giftBtns = document.querySelectorAll('.gift-btn');
  giftBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      giftBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Form submission handler
  const bookingForm = document.querySelector('.booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your appointment request has been submitted. Our team will contact you shortly to confirm.');
      bookingForm.reset();
    });
  }

  // ============================================
  // Ritual Journey Section — Interactive Cards
  // ============================================
  const ritualCards = document.querySelectorAll('.ritual-card');
  const ritualDots = document.querySelectorAll('.ritual-dot');
  const ritualFill = document.getElementById('ritualFill');
  const ritualPrev = document.getElementById('ritualPrev');
  const ritualNext = document.getElementById('ritualNext');

  if (ritualCards.length) {
    let activeIdx = 0; // 0-indexed active step

    const TOTAL = ritualCards.length;

    const setActiveStep = (idx) => {
      activeIdx = Math.max(0, Math.min(idx, TOTAL - 1));

      // Update cards
      ritualCards.forEach((card, i) => {
        card.classList.toggle('active', i === activeIdx);
      });

      // Update dots
      ritualDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIdx);
      });

      // Update progress bar (25% per step, 1-indexed)
      if (ritualFill) {
        const pct = Math.round(((activeIdx + 1) / TOTAL) * 100);
        ritualFill.style.width = `${pct}%`;
      }
    };

    // Arrow buttons
    if (ritualPrev) {
      ritualPrev.addEventListener('click', () => setActiveStep(activeIdx - 1));
    }
    if (ritualNext) {
      ritualNext.addEventListener('click', () => setActiveStep(activeIdx + 1));
    }

    // Dot clicks
    ritualDots.forEach((dot, i) => {
      dot.addEventListener('click', () => setActiveStep(i));
    });

    // Card clicks
    ritualCards.forEach((card, i) => {
      card.addEventListener('click', () => setActiveStep(i));
    });

    // Keyboard navigation when section is in focus
    document.addEventListener('keydown', (e) => {
      const section = document.getElementById('journey');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === 'ArrowRight') setActiveStep(activeIdx + 1);
      if (e.key === 'ArrowLeft') setActiveStep(activeIdx - 1);
    });

    // Auto-advance on first load with stagger
    setTimeout(() => setActiveStep(0), 300);
  }

  // ============================================
  // Mobile Gallery Tap & Slide Carousel Logic
  // ============================================
  const galleryBento = document.getElementById('galleryBento');
  const galleryDots = document.querySelectorAll('.g-dot');
  const galleryItems = document.querySelectorAll('.gb-item');

  if (galleryBento && galleryItems.length) {
    // Tap on image card to slide to next image on mobile
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        // Only trigger slide behavior on mobile/tablet viewports where carousel is active
        if (window.innerWidth <= 768) {
          const nextIndex = (index + 1) % galleryItems.length;
          const targetItem = galleryItems[nextIndex];
          if (targetItem) {
            targetItem.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });
          }
        }
      });
    });

    // Dot click navigation
    galleryDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(idx) && galleryItems[idx]) {
          galleryItems[idx].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      });
    });

    // Update active dot on scroll
    let scrollTimeout;
    galleryBento.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.innerWidth > 768) return;
        const bentoRect = galleryBento.getBoundingClientRect();
        const bentoCenter = bentoRect.left + bentoRect.width / 2;

        let closestIndex = 0;
        let minDistance = Infinity;

        galleryItems.forEach((item, i) => {
          const itemRect = item.getBoundingClientRect();
          const itemCenter = itemRect.left + itemRect.width / 2;
          const dist = Math.abs(bentoCenter - itemCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestIndex = i;
          }
        });

        galleryDots.forEach((dot, i) => {
          dot.classList.toggle('active', i === closestIndex);
        });
      }, 50);
    }, { passive: true });
  }
});

