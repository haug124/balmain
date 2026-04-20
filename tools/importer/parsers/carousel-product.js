/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-product.
 * Base: carousel. Source: https://de.balmain.com/de
 * Selectors from captured DOM:
 *   - section.carousel_classic .bal-item (product category carousel)
 *   - section.bal-culture .bal-culture-carousel-tile (culture editorial carousel)
 * Target: Carousel block - Each row = [image | heading + text + CTAs] (2 columns)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Pattern 1: Classic product carousel (Ébène Bags, Shoes, Belts)
  const classicItems = element.querySelectorAll('.bal-item');

  // Pattern 2: Culture editorial carousel (Antonin Tron, Pierre Balmain, etc.)
  const cultureItems = element.querySelectorAll('.bal-culture-carousel-tile');

  if (classicItems.length > 0) {
    classicItems.forEach((item) => {
      const img = item.querySelector('.media-container img, .bal-media img, picture img');
      const subtitle = item.querySelector('.bal-item--subtitle');
      const title = item.querySelector('.bal-item--title, h3');
      const ctaLinks = Array.from(item.querySelectorAll('.bal-cta--holder a'));

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
  } else if (cultureItems.length > 0) {
    // Culture carousel tiles
    cultureItems.forEach((tile) => {
      const link = tile.querySelector('a.bal-culture-item-link');
      const img = tile.querySelector('.bal-media img, picture img');
      const title = tile.querySelector('.bal-culture-item-title, h3');
      const cta = tile.querySelector('.bal-culture-item-cta');

      const textWrapper = document.createElement('div');
      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title.textContent.trim().replace(/\s+/g, ' ');
        textWrapper.append(h3);
      }
      if (cta && link) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = cta.textContent.trim();
        p.append(a);
        textWrapper.append(p);
      }

      if (img) {
        cells.push([img, textWrapper]);
      } else {
        cells.push([textWrapper]);
      }
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-product', cells });
  element.replaceWith(block);
}
