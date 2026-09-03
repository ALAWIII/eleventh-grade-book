/**
 * Force mdBook sidebar to start hidden on page load, then hand control
 * back to mdBook's own toggle logic on the first user interaction.
 *
 * This avoids the leftover white space caused by the sidebar being
 * visually closed but its reserved layout space still present.
 */
(function () {
  // Grab key elements by their IDs
  const sidebar = document.getElementById('mdbook-sidebar');
  const resizeHandle = document.getElementById('mdbook-sidebar-resize-handle');
  const pageWrapper = document.getElementById('mdbook-page-wrapper');
  const toggleButton = document.getElementById('mdbook-sidebar-toggle');

  /**
   * Force the sidebar into a fully "hidden" state:
   * - Hide the sidebar element itself
   * - Hide the resize handle (only relevant when sidebar is visible)
   * - Collapse the page wrapper's margins/width so no white space remains
   * - Ensure <html> reflects the "sidebar-hidden" state
   */
  function forceHidden() {
    if (sidebar) {
      sidebar.style.display = 'none';
      sidebar.setAttribute('aria-hidden', 'true');
    }

    if (resizeHandle) {
      resizeHandle.style.display = 'none';
    }

    if (pageWrapper) {
      // Remove any reserved space for the sidebar
      pageWrapper.style.marginLeft = '0';
      pageWrapper.style.marginRight = '0';
      pageWrapper.style.width = '100%';
      pageWrapper.style.maxWidth = '100%';
    }

    // Update mdBook's global layout state
    document.documentElement.classList.remove('sidebar-visible');
    document.documentElement.classList.add('sidebar-hidden');
  }

  /**
   * Clear the inline style overrides we set in forceHidden().
   *
   * mdBook's own CSS and JS manage sidebar visibility via classes and
   * attributes. Our inline styles have higher specificity, so we must
   * remove them to let mdBook's normal toggle behavior work correctly.
   */
  function clearOverrides() {
    if (pageWrapper) {
      pageWrapper.style.marginLeft = '';
      pageWrapper.style.marginRight = '';
      pageWrapper.style.width = '';
      pageWrapper.style.maxWidth = '';
    }

    if (resizeHandle) {
      resizeHandle.style.display = '';
    }
  }

  // Apply forced-hidden state immediately on page load
  forceHidden();

  /**
   * On the first click of the sidebar toggle button:
   * - Let mdBook's own click handler run first (it updates classes, aria, etc.)
   * - Then clear our inline style overrides so future toggles behave normally
   *
   * We use { once: true } so this listener automatically removes itself after
   * the first click — from then on, mdBook fully controls sidebar behavior.
   */
  if (toggleButton) {
    toggleButton.addEventListener('click', function () {
      // Run after mdBook's own handler
      setTimeout(clearOverrides, 0);
    }, { once: true });
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  // to make the main content alligned from right to left rtl
  document.querySelectorAll('main').forEach(function (m) {
    m.setAttribute('dir', 'rtl');
  });
});