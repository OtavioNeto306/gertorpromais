export function initHeaderScrollEffect() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 80) { 
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });
}

export function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq__question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const currentlyExpanded = question.getAttribute('aria-expanded') === 'true';
      const answer = question.nextElementSibling;

      faqQuestions.forEach(q => {
        if (q !== question) {
          q.setAttribute('aria-expanded', 'false');
          q.nextElementSibling.setAttribute('aria-hidden', 'true');
        }
      });
      
      if (currentlyExpanded) {
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
      } else {
        question.setAttribute('aria-expanded', 'true');
        answer.setAttribute('aria-hidden', 'false');
      }
    });
  });
}

export function initVisualFeedbackForButtons() {
  document.querySelectorAll('.btn[data-loading-text]').forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.closest('form') && this.type === 'submit') return; 
      if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) return;

      e.preventDefault();
      
      const originalText = this.innerHTML;
      const loadingText = this.dataset.loadingText || 'Carregando...';
      
      this.classList.add('btn--loading');
      this.disabled = true;
      this.innerHTML = `<span class="btn__loading-spinner"></span> ${loadingText}`;
      
      setTimeout(() => {
        this.classList.remove('btn--loading');
        this.disabled = false;
        this.innerHTML = originalText;
        showToast('Ação simulada com sucesso!', 'success');
      }, 1500);
    });
  });
}

export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animation]');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  animatedElements.forEach(el => observer.observe(el));
}

export function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (!lazyImages.length) return;

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('lazy-loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.classList.add('lazy-loaded');
    });
  }
}

export function showToast(message, type = 'info', duration = 3000) {
  const toastContainer = document.getElementById('toast-container') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');

  const iconMap = {
    success: '<i class="fas fa-check-circle"></i>',
    error: '<i class="fas fa-times-circle"></i>',
    warning: '<i class="fas fa-exclamation-triangle"></i>',
    info: '<i class="fas fa-info-circle"></i>'
  };
  
  toast.innerHTML = `
    <div class="toast__icon">${iconMap[type] || iconMap.info}</div>
    <div class="toast__message">${message}</div>
    <button class="toast__close-btn" aria-label="Fechar notificação">&times;</button>
  `;
  
  toastContainer.appendChild(toast);

  toast.querySelector('.toast__close-btn').addEventListener('click', () => {
    removeToast(toast);
  });

  setTimeout(() => {
    toast.classList.add('toast--enter');
  }, 10); 

  setTimeout(() => {
    removeToast(toast);
  }, duration);
}

function removeToast(toast) {
  toast.classList.remove('toast--enter'); 
  toast.classList.add('toast--exit');
  toast.addEventListener('transitionend', () => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
    const container = document.getElementById('toast-container');
    if (container && !container.hasChildNodes()) {
    }
  }, { once: true });
}


export function createToastContainer() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
}