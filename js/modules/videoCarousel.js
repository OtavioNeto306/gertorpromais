export function initVideoCarousel() {
  const carouselSection = document.getElementById('video-carousel');
  if (!carouselSection) return;

  const track = carouselSection.querySelector('.carousel-track');
  const items = Array.from(track.children);
  const nextButton = carouselSection.querySelector('.carousel-button--next');
  const prevButton = carouselSection.querySelector('.carousel-button--prev');
  const modal = document.getElementById('video-modal');
  const modalIframe = document.getElementById('video-modal-iframe');
  const modalCloseButton = document.getElementById('video-modal-close');
  const modalOverlay = document.getElementById('video-modal-overlay');

  if (!track || !nextButton || !prevButton || !modal || !modalIframe || !modalCloseButton || !modalOverlay) {
    console.error('Video carousel elements not found.');
    return;
  }

  let currentIndex = 0;
  let itemsPerPage = 3; 
  const totalItems = items.length;

  function updateItemsPerPage() {
    if (window.innerWidth <= 768) {
      itemsPerPage = 1;
    } else if (window.innerWidth <= 992) {
      itemsPerPage = 2;
    } else {
      itemsPerPage = 3;
    }
  }

  function updateCarousel() {
    if (!items.length) return; 
    
    const itemStyle = getComputedStyle(items[0]);
    const itemOuterWidth = items[0].offsetWidth + parseInt(itemStyle.marginLeft) + parseInt(itemStyle.marginRight);

    track.style.transform = `translateX(-${currentIndex * itemOuterWidth}px)`;
    
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= totalItems - itemsPerPage;
  }

  nextButton.addEventListener('click', () => {
    if (currentIndex < totalItems - itemsPerPage) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const videoId = item.dataset.videoId;
      if (videoId) {
        openModalWithVideo(videoId);
      }
    });
  });

  function openModalWithVideo(videoId) {
    modalIframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  }

  function closeModal() {
    modal.classList.remove('active');
    modalIframe.src = ''; 
    document.body.style.overflow = ''; 
  }

  modalCloseButton.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  window.addEventListener('resize', () => {
    updateItemsPerPage();
    updateCarousel();
  });

  updateItemsPerPage();
  updateCarousel(); 
}