import { showToast } from './ui.js';

export function initNewsletterForm() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (!newsletterForm) {
    const finalCtaForm = document.getElementById('final-cta-form');
    if(finalCtaForm) {
      initFinalCtaForm(finalCtaForm);
    }
    return;
  }

  const newsletterInput = newsletterForm.querySelector('.newsletter__input');
  const newsletterButton = newsletterForm.querySelector('.newsletter__button');

  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = newsletterInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    clearFormMessage(newsletterForm);
    
    if (!email) {
      showFormMessage(newsletterForm, 'Por favor, digite seu e-mail.', 'error');
      return;
    }
    
    if (!emailRegex.test(email)) {
      showFormMessage(newsletterForm, 'Por favor, digite um e-mail válido.', 'error');
      return;
    }
    
    newsletterButton.classList.add('btn--loading');
    newsletterButton.disabled = true;
    newsletterButton.innerHTML = '<span class="btn__loading-spinner"></span> Enviando...';
    
    setTimeout(() => {
      newsletterButton.classList.remove('btn--loading');
      newsletterButton.disabled = false;
      newsletterButton.innerHTML = 'Assinar';
      
      showFormMessage(newsletterForm, 'E-mail cadastrado com sucesso! Obrigado.', 'success');
      newsletterInput.value = '';
      
      try {
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        subscribers.push({ email: email, date: new Date().toISOString() });
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      } catch (error) {
        console.error("Erro ao salvar no localStorage:", error);
      }
      
    }, 1500);
  });
}

export function initFinalCtaForm(formElement) {
  if (!formElement) return;

  const submitButton = formElement.querySelector('.btn');

  formElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    clearFormMessage(formElement); 
        
    const originalButtonText = submitButton.innerHTML;
    submitButton.classList.add('btn--loading');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="btn__loading-spinner"></span> Processando...';
    
    setTimeout(() => {
      submitButton.classList.remove('btn--loading');
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
      
      showFormMessage(formElement, 'Ação simulada! Redirecionando em breve...', 'success');
      console.log("Botão 'Quero Iniciar Gratuitamente' clicado.");
      
    }, 1500);
  });
}


function showFormMessage(formElement, text, type, insertAfterElement = null) {
  clearFormMessage(formElement);
  const message = document.createElement('p');
  message.className = `form-message form-message--${type}`;
  message.textContent = text;
  
  if (insertAfterElement && insertAfterElement.parentNode === formElement) {
    insertAfterElement.parentNode.insertBefore(message, insertAfterElement.nextSibling);
  } else {
    const button = formElement.querySelector('.btn');
    if (button) {
      formElement.insertBefore(message, button);
    } else {
      formElement.appendChild(message);
    }
  }

  setTimeout(() => {
    if (message.parentNode) {
      message.remove();
    }
  }, 5000);
}

function clearFormMessage(formElement) {
  const existingMessage = formElement.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
}