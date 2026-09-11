document.addEventListener('DOMContentLoaded', function () {
  var PER_PAGE = 12; // 가로 4 x 세로 3

  var photos = (typeof GALLERY_PHOTOS !== 'undefined') ? GALLERY_PHOTOS : [];
  var grid = document.getElementById('galleryGrid');
  if (!grid) return; // 갤러리 페이지가 아니면 아무것도 하지 않음

  var dotsWrap = document.getElementById('galleryDots');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var closeBtn = document.getElementById('lightboxClose');
  var prevBtn = document.getElementById('lightboxPrev');
  var nextBtn = document.getElementById('lightboxNext');

  var totalPages = Math.max(1, Math.ceil(photos.length / PER_PAGE));
  var currentPage = 0;
  var currentPhotoIndex = 0;

  function renderPage(page) {
    currentPage = page;
    grid.innerHTML = '';

    var start = page * PER_PAGE;
    var pagePhotos = photos.slice(start, start + PER_PAGE);

    pagePhotos.forEach(function (photo, i) {
      var item = document.createElement('div');
      item.className = 'gallery-item';

      var img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.alt || '';
      img.loading = 'lazy';

      item.appendChild(img);
      item.addEventListener('click', function () {
        openLightbox(start + i);
      });
      grid.appendChild(item);
    });

    renderDots();
  }

  function renderDots() {
    dotsWrap.innerHTML = '';
    if (totalPages <= 1) return; // 한 페이지뿐이면 번호를 표시하지 않음

    for (var p = 0; p < totalPages; p++) {
      var dot = document.createElement('button');
      if (p === currentPage) dot.className = 'active';
      dot.setAttribute('aria-label', (p + 1) + '페이지');
      (function (page) {
        dot.addEventListener('click', function () { renderPage(page); });
      })(p);
      dotsWrap.appendChild(dot);
    }
  }

  function openLightbox(index) {
    currentPhotoIndex = index;
    updateLightboxImage();
    lightbox.classList.add('open');
  }

  function updateLightboxImage() {
    var photo = photos[currentPhotoIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt || '';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
  }

  function showPrev() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updateLightboxImage();
  }

  function showNext() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updateLightboxImage();
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  // 사진 바깥 어두운 영역을 눌러도 닫히게
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // 키보드 화살표 / ESC 지원
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  renderPage(0);
});
