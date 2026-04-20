/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-product.
 * Base: cards. Source: https://de.balmain.com/de
 * Selectors from captured DOM:
 *   - .bal-flexible--content > .experience-component (for 50/50 layouts)
 *   - .bal-reinsurance > .bal-reinsurance-item (for info cards)
 *   - .bal-item for each card with image, .bal-reinsurance-item for no-image cards
 * Target: Cards block - Each row = [image | heading + text + CTAs] or [heading + text + CTAs] (no image)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Pattern 1: 50/50 flexible layout cards (Spring Offers, Sneakers/Mens)
  const flexItems = element.querySelectorAll('.bal-item');

  // Pattern 2: Reassurance/info cards (Boutiques, Customer Care, FAQ)
  const reinsuranceItems = element.querySelectorAll('.bal-reinsurance-item');

  if (flexItems.length > 0) {
    // Image cards from bal-flexible layout
    flexItems.forEach((item) => {
      const img = item.querySelector('.media-container img, .bal-media img, picture img');
      const subtitle = item.querySelector('.bal-item--subtitle');
      const title = item.querySelector('.bal-item--title, h3');
      const ctaLinks = Array.from(item.querySelectorAll('.bal-cta--holder a'));

      // Build text content cell
      const textWrapper = document.createElement('div');
      if (subtitle) {
        const p = document.createElement('p');
        p.textContent = subtitle.textContent.trim();
        textWrapper.append(p);
      }
      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title.textContent.trim();
        textWrapper.append(h3);
      }
      ctaLinks.forEach((cta) => {
        const p = document.createElement('p');
        const link = document.createElement('a');
        link.href = cta.href;
        link.textContent = cta.textContent.trim();
        p.append(link);
        textWrapper.append(p);
      });

      if (img) {
        cells.push([img, textWrapper]);
      } else {
        cells.push([textWrapper]);
      }
    });
  } else if (reinsuranceItems.length > 0) {
    // No-image info cards from bal-reinsurance
    reinsuranceItems.forEach((item) => {
      const heading = item.querySelector('.h3-heading-style, h3');
      const description = item.querySelector('.bal-reinsurance-content > p:not(.h3-heading-style)');
      const cta = item.querySelector('a.bt-tertiary') || item.querySelector('button.bt-tertiary');

      const textWrapper = document.createElement('div');
      if (heading) {
        const h3 = document.createElement('h3');
        h3.textContent = heading.textContent.trim();
        textWrapper.append(h3);
      }
      if (description) {
        const p = document.createElement('p');
        p.textContent = description.textContent.trim();
        textWrapper.append(p);
      }
      if (cta) {
        const p = document.createElement('p');
        const link = document.createElement('a');
        link.href = cta.href || '#';
        link.textContent = cta.textContent.trim();
        p.append(link);
        textWrapper.append(p);
      }

      cells.push([textWrapper]);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
