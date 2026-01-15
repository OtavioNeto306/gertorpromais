import { initMobileNav, initSmoothScroll } from './modules/navigation.js';
import { 
  initHeaderScrollEffect, 
  initFaqAccordion, 
  initVisualFeedbackForButtons, 
  initScrollAnimations, 
  initLazyLoading, 
  showToast, 
  createToastContainer 
} from './modules/ui.js';
import { initNewsletterForm, initFinalCtaForm } from './modules/forms.js';
import { initVideoCarousel } from './modules/videoCarousel.js';
import { loadHTMLPartials } from './modules/utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadHTMLPartials();

    initMobileNav();
    initSmoothScroll();
    initHeaderScrollEffect();
    initFaqAccordion();
    initNewsletterForm(); 
    const finalCtaFormElement = document.getElementById('final-cta-form');
    if (finalCtaFormElement) {
      initFinalCtaForm(finalCtaFormElement); 
    }
    initVisualFeedbackForButtons();
    initScrollAnimations();
    initLazyLoading();
    createToastContainer(); 
    initVideoCarousel();

    document.body.classList.add('loaded');
    console.log('GestorPRO Landing Page carregada e scripts inicializados!');
    showToast('Bem-vindo ao GestorPRO!', 'info');
  } catch (error) {
    console.error("Erro ao inicializar a página:", error);
    document.body.innerHTML = '<p style="color:red; text-align:center; font-size: 20px; margin-top: 50px;">Oops! Algo deu errado ao carregar a página. Por favor, tente recarregar.</p>';
  }
});