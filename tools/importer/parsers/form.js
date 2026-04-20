/* eslint-disable */
/* global WebImporter */

/**
 * Parser for form block (newsletter signup).
 * Base: form. Source: https://de.balmain.com/de
 * Selectors from captured DOM: .footer_signup with .title-opt-in, .text-opt-in, form.newsletter-form
 * Target: Form block - Row 1: form heading + description, Row 2: form reference link
 * Note: Forms plugin uses base "form" name (no variant). Form content is JSON-driven.
 */
export default function parse(element, { document }) {
  // Extract heading
  const title = element.querySelector('.title-opt-in');
  // Extract description text
  const description = element.querySelector('.text-opt-in');

  const cells = [];

  // Row 1: Title and description as default content above the form block
  const contentWrapper = document.createElement('div');
  if (title) {
    const h2 = document.createElement('h2');
    h2.textContent = title.textContent.trim();
    contentWrapper.append(h2);
  }
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    contentWrapper.append(p);
  }

  // Row 1: Form reference (placeholder for form JSON definition)
  const formLink = document.createElement('a');
  formLink.href = '/forms/newsletter';
  formLink.textContent = '/forms/newsletter';
  cells.push([formLink]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'form', cells });

  // Insert title/description before the form block
  if (contentWrapper.children.length > 0) {
    element.before(contentWrapper);
  }

  element.replaceWith(block);
}
