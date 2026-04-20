/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Balmain site cleanup.
 * Selectors from captured DOM of https://de.balmain.com/de
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie consent, modals, and overlays (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#didomi-host',                          // Didomi cookie consent
      '.modal.js-localization-modal',          // Country localization modal
      '.modal.reset-modal',                    // Password reset modal
      '.newsletter-success-modal',             // Newsletter success popup
      '.js-analytics-global',                  // Analytics container
      '.js-analytics-page',                    // Page analytics
      '#shippingOverlay',                      // Shipping overlay modal
      '#returnOverlay',                        // Return overlay modal
      '#expertOverlay',                        // Expert overlay modal
      '.bal-modal',                            // All Balmain modals
      '.minicart-total',                       // Mini cart overlay
      '.bal-search',                           // Search overlay
      '[class*="search-overlay"]',             // Search overlay containers
      '#minicart-sidenav',                     // Minicart side nav
      '#minicartOverlay',                      // Minicart overlay
      '#search-sidenav',                       // Search side nav
      '.minicart-empty',                       // Empty cart message
      '.minicart-content',                     // Cart content
      '.form-minicart',                        // Cart form
      '.site-search',                          // Site search container
      '.recommendations',                      // Product recommendations
      '.search',                               // Search container
      '.suggestions-wrapper',                  // Search suggestions wrapper
    ]);
  }

  if (hookName === H.after) {
    // Remove non-authorable site shell content
    WebImporter.DOMUtils.remove(element, [
      'header',                                // Site header with announcement bar and logo
      'nav#balheadnav',                        // Main navigation
      '.menu-wrapper',                         // Mobile menu
      'footer#footercontent',                  // Site footer
      '.scroll-down-sign',                     // Scroll indicator
      '.bal-slider--nav',                      // Slider navigation dots
      '.spacer',                               // Empty spacer divs
      'noscript',                              // NoScript tags
      'link',                                  // Link tags
      'iframe',                                // Tracking iframes
      '.product-tile',                         // Product recommendation tiles
      '.bal-search-layer',                     // Search layer
      '.search-suggestions',                   // Search suggestions
      '.bal-minicart',                         // Minicart container
    ]);

    // Clean up data attributes from captured DOM
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-frz-flags');
      el.removeAttribute('data-frz-version');
      el.removeAttribute('data-scrolltop');
    });
  }
}
