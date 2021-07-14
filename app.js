const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightbox__imageRef = document.querySelector('.lightbox__image');

const closeLightboxBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

let currentImageIndex = 0;

// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.

const galleryItemsMarkup = galleryItems
.map(({preview, original, description}, index ) => {
  return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    data-index="${index}"
    alt="${description}"
  />
</a>
</li>
`;
})
.join('');

galleryRef.insertAdjacentHTML('beforeend', galleryItemsMarkup);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(s) {
  s.preventDefault();

  const originalImgSrc = s.target.dataset.source;
  
  currentImageIndex = Number(s.target.dataset.index);
  if (!s.target.classList.contains('gallery__image')) {
    return;
}
  // Открытие модального окна по клику на элементе галереи.
  
  lightboxRef.classList.add('is-open');

  // Подмена значения атрибута src элемента img.lightbox__image.

lightbox__imageRef.src = originalImgSrc;

lightboxRef.addEventListener('click', onlightboxRefClick);

window.addEventListener('keydown', onEscBtnKeydown);

window.addEventListener('keydown', onArrowBtnKeydown);
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].

function onlightboxRefClick(s) {
  const isCloseBtnClicked = s.target.dataset.action === 'close-lightbox';

if (isCloseBtnClicked) {
  closeLightbox();
}

  // Закрытие модального окна по клику на div.lightbox__overlay.

  const lightbox__overlayRef = document.querySelector('.lightbox__overlay');

  const isLightbox__overlayClicked = s.target === lightbox__overlayRef;

  if (isLightbox__overlayClicked) {
    closeLightbox();
  }
}

function closeLightbox() {
  lightboxRef.classList.remove('is-open');
  
  closeLightboxBtn.removeEventListener('click', onlightboxRefClick);
  
  window.removeEventListener('keydown', onEscBtnKeydown);
  
  window.removeEventListener('keydown', onArrowBtnKeydown);

  // Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
  
  lightbox__imageRef.src = '';

  currentImageIndex = 0;
}

  // Закрытие модального окна по нажатию клавиши ESC.

function onEscBtnKeydown(s) {

  const isEscBtnClicked = s.code === 'Escape';

  if (isEscBtnClicked) {
    closeLightbox();
  }
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".


function onArrowBtnKeydown(s) {
  const isScrollLeft = s.code === 'ArrowLeft';
  const isScrollRight = s.code === 'ArrowRight';

  if (isScrollLeft) {
    currentImageIndex -= 1;
    if (currentImageIndex < 0) {
      currentImageIndex = galleryItems.length - 1;
    }
  }

  if (isScrollRight) {
    currentImageIndex += 1;
    if (currentImageIndex > galleryItems.length - 1) {
      currentImageIndex = 0;
    }
  }
  const newOriginalImageSrc = galleryItems[currentImageIndex].original;
  lightbox__imageRef.src = newOriginalImageSrc;
}