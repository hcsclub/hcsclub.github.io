document.addEventListener('DOMContentLoaded', function () {
  var cards = document.querySelectorAll('.notice-card');
  if (!cards.length) return; // 공지사항 페이지가 아니면 아무것도 하지 않음

  var modal = document.getElementById('noticeModal');
  var modalTitle = document.getElementById('noticeModalTitle');
  var modalDate = document.getElementById('noticeModalDate');
  var modalBody = document.getElementById('noticeModalBody');
  var closeBtn = document.getElementById('noticeModalClose');

  function openModal(id) {
    var full = document.querySelector('.notice-full[data-notice-id="' + id + '"]');
    if (!full) return;

    var title = full.querySelector('.notice-full-title').textContent;
    var date = full.querySelector('.notice-full-date').textContent;
    var body = full.querySelector('.notice-full-body').innerHTML;

    modalTitle.textContent = title;
    modalDate.textContent = date;
    modalBody.innerHTML = body;
    modal.classList.add('open');
  }

  function closeModal() {
    modal.classList.remove('open');
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card.getAttribute('data-notice-id'));
    });
    // 키보드로도 열 수 있게(Enter, Space)
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.getAttribute('data-notice-id'));
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
});
