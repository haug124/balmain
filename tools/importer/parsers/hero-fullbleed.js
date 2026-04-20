/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-fullbleed.
 * Base: hero. Source: https://de.balmain.com/de
 * Selectors from captured DOM: .bal-slide with .bal-slide--title and .bal-slide--cta_container
 * Target: Hero block - Row 1: background image, Row 2: heading + CTAs
 */
export default function parse(element, { document }) {
  // Extract background image from the media container
  const img = element.querySelector('.media-container img, .bal-media img, picture img');

  // Extract heading text from slide title
  const titleEl = element.querySelector('.bal-slide--title, h2, h1');

  // Extract CTA links from the CTA container
  const ctaContainer = element.querySelector('.bal-slide--cta_container');
  const ctas = ctaContainer
    ? Array.from(ctaContainer.querySelectorAll('a'))
    : Array.from(element.querySelectorAll('a.bt-tertiary'));

  const cells = [];

  // Row 1: Background image
  if (img) {
    cells.push([img]);
  }

  // Row 2: Title + CTAs in a single content cell
  const wrapper = document.createElement('div');
  if (titleEl) {
    const h2 = document.createElement('h2');
    h2.textContent = titleEl.textContent.trim();
    wrapper.append(h2);
  }
  ctas.forEach((cta) => {
    const p = document.createElement('p');
    const link = document.createElement('a');
    link.href = cta.href;
    link.textContent = cta.textContent.trim();
    p.append(link);
    wrapper.append(p);
  });

  if (wrapper.children.length > 0) {
    cells.push([wrapper]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-fullbleed', cells });
  element.replaceWith(block);
}
