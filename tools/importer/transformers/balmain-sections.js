/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Balmain section breaks and section-metadata.
 * Runs afterTransform only. Uses payload.template.sections from page-templates.json.
 * Selectors from captured DOM of https://de.balmain.com/de
 *
 * Sections are deeply nested at different levels, so :nth-of-type selectors
 * don't reliably match. Instead we collect all matching elements for each
 * component class and use occurrence index to disambiguate.
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const document = element.ownerDocument;

    // Ordered section definitions with class-based selectors and occurrence index
    // Selectors from captured DOM: each .experience-component div has a unique layout class
    const sectionDefs = [
      { cls: 'experience-bal_layouts-bal_mainslider', occurrence: 0, style: null },          // Hero SS26
      { cls: 'experience-bal_layouts-bal_flexible_layout', occurrence: 0, style: null },      // Spring Offers
      { cls: 'experience-bal_layouts-bal_carousel_classic', occurrence: 0, style: null },     // Product Carousel
      { cls: 'experience-bal_layouts-bal_flexible_layout', occurrence: 1, style: null },      // Sneakers+Mens
      { cls: 'experience-bal_layouts-bal_mainslider', occurrence: 1, style: null },           // Hero FW26
      { cls: 'experience-bal_layouts-bal_culture_layout', occurrence: 0, style: null },       // Culture
      { cls: 'experience-bal_assets-bal_newslatter_singup', occurrence: 0, style: null },     // Newsletter
      { cls: 'experience-bal_assets-bal_reinsurance', occurrence: 0, style: null },           // Info Cards
    ];

    // Resolve each section to a DOM element
    const resolved = sectionDefs.map((def) => {
      const all = [...element.querySelectorAll(`.${def.cls}`)];
      return { el: all[def.occurrence] || null, style: def.style };
    });

    // Insert section breaks and metadata in reverse order
    for (let i = resolved.length - 1; i >= 0; i--) {
      const { el, style } = resolved[i];
      if (!el) continue;

      if (style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style },
        });
        el.after(metaBlock);
      }

      if (i > 0) {
        const hr = document.createElement('hr');
        el.before(hr);
      }
    }
  }
}
