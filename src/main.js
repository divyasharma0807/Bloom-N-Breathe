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
});
