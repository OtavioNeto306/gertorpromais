export async function loadHTMLPartials() {
  const partials = [
    { placeholder: 'header-placeholder', path: 'partials/header.html' },
    { placeholder: 'hero-placeholder', path: 'partials/hero.html' },
    { placeholder: 'presentation-placeholder', path: 'partials/presentation.html' },
    { placeholder: 'resources-placeholder', path: 'partials/resources.html' },
    { placeholder: 'video-placeholder', path: 'partials/video-section.html' },
    { placeholder: 'video-carousel-placeholder', path: 'partials/video-carousel.html' },
    { placeholder: 'plans-placeholder', path: 'partials/plans.html' },
    { placeholder: 'testimonials-placeholder', path: 'partials/testimonials.html' },
    { placeholder: 'faq-placeholder', path: 'partials/faq.html' },
    { placeholder: 'final-cta-placeholder', path: 'partials/final-cta.html' },
    { placeholder: 'footer-placeholder', path: 'partials/footer.html' }
  ];

  for (const partial of partials) {
    const element = document.getElementById(partial.placeholder);
    if (element) {
      try {
        const response = await fetch(partial.path);
        if (!response.ok) throw new Error(`Failed to load ${partial.path}: ${response.statusText}`);
        const html = await response.text();
        element.innerHTML = html;
      } catch (error) {
        console.error(`Error loading partial ${partial.path}:`, error);
        element.innerHTML = `<p style="color:red; text-align:center;">Erro ao carregar esta seção.</p>`;
      }
    }
  }
}