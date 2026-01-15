// Navegação Mobile
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav__link').forEach(n => n.addEventListener('click', () => {
  navMenu.classList.remove('show-menu');
}));

// Rolagem suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY >= 50) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// FAQ Accordion
document.querySelectorAll('.faq__question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fechar todos os outros itens
    document.querySelectorAll('.faq__item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Abrir o item clicado se não estava ativo
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

// Validação e envio do formulário de newsletter
const newsletterForm = document.getElementById('newsletter-form');
const newsletterInput = newsletterForm.querySelector('.newsletter__input');
const newsletterButton = newsletterForm.querySelector('.btn');

newsletterForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = newsletterInput.value.trim();
  
  // Validação básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Remover mensagens anteriores
  const existingMessage = newsletterForm.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  if (!email) {
    showMessage('Por favor, digite seu e-mail.', 'error');
    return;
  }
  
  if (!emailRegex.test(email)) {
    showMessage('Por favor, digite um e-mail válido.', 'error');
    return;
  }
  
  // Simular envio
  newsletterButton.classList.add('loading');
  newsletterButton.textContent = 'Enviando...';
  
  setTimeout(() => {
    newsletterButton.classList.remove('loading');
    newsletterButton.innerHTML = '<i class="fas fa-paper-plane"></i> Assinar';
    
    showMessage('E-mail cadastrado com sucesso! Obrigado por se inscrever.', 'success');
    newsletterInput.value = '';
    
    // Salvar no localStorage (simulação)
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    subscribers.push({
      email: email,
      date: new Date().toISOString()
    });
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    
  }, 2000);
});

function showMessage(text, type) {
  const message = document.createElement('p');
  message.className = `form-message form-${type}`;
  message.textContent = text;
  
  newsletterForm.appendChild(message);
  
  // Remover mensagem após 5 segundos
  setTimeout(() => {
    message.remove();
  }, 5000);
}

// Feedback visual para botões de contratação
document.querySelectorAll('.plan__card .btn').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    const originalText = this.innerHTML;
    this.classList.add('loading');
    this.innerHTML = 'Processando...';
    
    setTimeout(() => {
      this.classList.remove('loading');
      this.innerHTML = originalText;
      
      // Simular redirecionamento ou ação
      alert('Redirecionando para o checkout... (Esta é uma demonstração)');
    }, 2000);
  });
});

// Feedback para botão CTA principal
document.querySelectorAll('.cta .btn, .hero .btn').forEach(button => {
  button.addEventListener('click', function(e) {
    if (this.getAttribute('href') === '#cadastro' || this.getAttribute('href') === '#apresentacao') {
      return; // Permitir navegação normal
    }
    
    e.preventDefault();
    
    const originalText = this.innerHTML;
    this.classList.add('loading');
    this.innerHTML = 'Carregando...';
    
    setTimeout(() => {
      this.classList.remove('loading');
      this.innerHTML = originalText;
      
      alert('Funcionalidade em desenvolvimento! (Esta é uma demonstração)');
    }, 1500);
  });
});

// Animações on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-on-scroll');
    }
  });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.feature__card, .resource__item, .plan__card, .testimonial__card').forEach(el => {
  observer.observe(el);
});

// Contador animado para números (se houver)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);
    
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroCards = document.querySelectorAll('.hero__card');
  
  heroCards.forEach((card, index) => {
    const speed = 0.5 + (index * 0.1);
    card.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Melhorar acessibilidade - navegação por teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Fechar menu mobile
    navMenu.classList.remove('show-menu');
    
    // Fechar FAQ ativo
    document.querySelectorAll('.faq__item.active').forEach(item => {
      item.classList.remove('active');
    });
  }
});

// Lazy loading para imagens (se houver)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Preloader (opcional)
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 300);
  }
});

// Função para detectar dispositivo móvel
function isMobile() {
  return window.innerWidth <= 768;
}

// Ajustar comportamentos para mobile
if (isMobile()) {
  // Reduzir animações em dispositivos móveis
  document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
  
  // Desabilitar parallax em mobile
  window.removeEventListener('scroll', () => {});
}

// Função para salvar dados de contato (simulação)
function saveContactData(data) {
  const contacts = JSON.parse(localStorage.getItem('contact_data') || '[]');
  contacts.push({
    ...data,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('contact_data', JSON.stringify(contacts));
}

// Função para analytics simples (simulação)
function trackEvent(eventName, data = {}) {
  console.log(`Event: ${eventName}`, data);
  
  // Aqui você integraria com Google Analytics, Facebook Pixel, etc.
  // gtag('event', eventName, data);
}

// Rastrear cliques importantes
document.querySelectorAll('.btn--primary').forEach(btn => {
  btn.addEventListener('click', () => {
    trackEvent('cta_click', {
      button_text: btn.textContent.trim(),
      page_section: btn.closest('section')?.id || 'unknown'
    });
  });
});

// Rastrear visualização de seções
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      trackEvent('section_view', {
        section: entry.target.id
      });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
  sectionObserver.observe(section);
});

// Função para mostrar notificações toast (opcional)
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#3498DB'};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Inicialização completa
document.addEventListener('DOMContentLoaded', () => {
  console.log('GestorPRO Landing Page carregada com sucesso!');
  
  // Adicionar classe para animações CSS
  document.body.classList.add('loaded');
  
  // Verificar se há dados salvos
  const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
  console.log(`Total de inscritos na newsletter: ${subscribers.length}`);
});