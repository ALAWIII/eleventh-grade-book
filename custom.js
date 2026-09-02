document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('main').forEach(function (m) {
    m.setAttribute('dir', 'rtl');
  });
});