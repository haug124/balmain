var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-balmain-homepage.js
  var import_balmain_homepage_exports = {};
  __export(import_balmain_homepage_exports, {
    default: () => import_balmain_homepage_default
  });

  // tools/importer/parsers/hero-fullbleed.js
  function parse(element, { document }) {
    const img = element.querySelector(".media-container img, .bal-media img, picture img");
    const titleEl = element.querySelector(".bal-slide--title, h2, h1");
    const ctaContainer = element.querySelector(".bal-slide--cta_container");
    const ctas = ctaContainer ? Array.from(ctaContainer.querySelectorAll("a")) : Array.from(element.querySelectorAll("a.bt-tertiary"));
    const cells = [];
    if (img) {
      cells.push([img]);
    }
    const wrapper = document.createElement("div");
    if (titleEl) {
      const h2 = document.createElement("h2");
      h2.textContent = titleEl.textContent.trim();
      wrapper.append(h2);
    }
    ctas.forEach((cta) => {
      const p = document.createElement("p");
      const link = document.createElement("a");
      link.href = cta.href;
      link.textContent = cta.textContent.trim();
      p.append(link);
      wrapper.append(p);
    });
    if (wrapper.children.length > 0) {
      cells.push([wrapper]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-fullbleed", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse2(element, { document }) {
    const cells = [];
    const flexItems = element.querySelectorAll(".bal-item");
    const reinsuranceItems = element.querySelectorAll(".bal-reinsurance-item");
    if (flexItems.length > 0) {
      flexItems.forEach((item) => {
        const img = item.querySelector(".media-container img, .bal-media img, picture img");
        const subtitle = item.querySelector(".bal-item--subtitle");
        const title = item.querySelector(".bal-item--title, h3");
        const ctaLinks = Array.from(item.querySelectorAll(".bal-cta--holder a"));
        const textWrapper = document.createElement("div");
        if (subtitle) {
          const p = document.createElement("p");
          p.textContent = subtitle.textContent.trim();
          textWrapper.append(p);
        }
        if (title) {
          const h3 = document.createElement("h3");
          h3.textContent = title.textContent.trim();
          textWrapper.append(h3);
        }
        ctaLinks.forEach((cta) => {
          const p = document.createElement("p");
          const link = document.createElement("a");
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
      reinsuranceItems.forEach((item) => {
        const heading = item.querySelector(".h3-heading-style, h3");
        const description = item.querySelector(".bal-reinsurance-content > p:not(.h3-heading-style)");
        const cta = item.querySelector("a.bt-tertiary") || item.querySelector("button.bt-tertiary");
        const textWrapper = document.createElement("div");
        if (heading) {
          const h3 = document.createElement("h3");
          h3.textContent = heading.textContent.trim();
          textWrapper.append(h3);
        }
        if (description) {
          const p = document.createElement("p");
          p.textContent = description.textContent.trim();
          textWrapper.append(p);
        }
        if (cta) {
          const p = document.createElement("p");
          const link = document.createElement("a");
          link.href = cta.href || "#";
          link.textContent = cta.textContent.trim();
          p.append(link);
          textWrapper.append(p);
        }
        cells.push([textWrapper]);
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-product.js
  function parse3(element, { document }) {
    const cells = [];
    const classicItems = element.querySelectorAll(".bal-item");
    const cultureItems = element.querySelectorAll(".bal-culture-carousel-tile");
    if (classicItems.length > 0) {
      classicItems.forEach((item) => {
        const img = item.querySelector(".media-container img, .bal-media img, picture img");
        const subtitle = item.querySelector(".bal-item--subtitle");
        const title = item.querySelector(".bal-item--title, h3");
        const ctaLinks = Array.from(item.querySelectorAll(".bal-cta--holder a"));
        const textWrapper = document.createElement("div");
        if (subtitle) {
          const p = document.createElement("p");
          p.textContent = subtitle.textContent.trim();
          textWrapper.append(p);
        }
        if (title) {
          const h3 = document.createElement("h3");
          h3.textContent = title.textContent.trim();
          textWrapper.append(h3);
        }
        ctaLinks.forEach((cta) => {
          const p = document.createElement("p");
          const link = document.createElement("a");
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
      cultureItems.forEach((tile) => {
        const link = tile.querySelector("a.bal-culture-item-link");
        const img = tile.querySelector(".bal-media img, picture img");
        const title = tile.querySelector(".bal-culture-item-title, h3");
        const cta = tile.querySelector(".bal-culture-item-cta");
        const textWrapper = document.createElement("div");
        if (title) {
          const h3 = document.createElement("h3");
          h3.textContent = title.textContent.trim().replace(/\s+/g, " ");
          textWrapper.append(h3);
        }
        if (cta && link) {
          const p = document.createElement("p");
          const a = document.createElement("a");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/form.js
  function parse4(element, { document }) {
    const title = element.querySelector(".title-opt-in");
    const description = element.querySelector(".text-opt-in");
    const cells = [];
    const contentWrapper = document.createElement("div");
    if (title) {
      const h2 = document.createElement("h2");
      h2.textContent = title.textContent.trim();
      contentWrapper.append(h2);
    }
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      contentWrapper.append(p);
    }
    const formLink = document.createElement("a");
    formLink.href = "/forms/newsletter";
    formLink.textContent = "/forms/newsletter";
    cells.push([formLink]);
    const block = WebImporter.Blocks.createBlock(document, { name: "form", cells });
    if (contentWrapper.children.length > 0) {
      element.before(contentWrapper);
    }
    element.replaceWith(block);
  }

  // tools/importer/transformers/balmain-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#didomi-host",
        // Didomi cookie consent
        ".modal.js-localization-modal",
        // Country localization modal
        ".modal.reset-modal",
        // Password reset modal
        ".newsletter-success-modal",
        // Newsletter success popup
        ".js-analytics-global",
        // Analytics container
        ".js-analytics-page",
        // Page analytics
        "#shippingOverlay",
        // Shipping overlay modal
        "#returnOverlay",
        // Return overlay modal
        "#expertOverlay",
        // Expert overlay modal
        ".bal-modal",
        // All Balmain modals
        ".minicart-total",
        // Mini cart overlay
        ".bal-search",
        // Search overlay
        '[class*="search-overlay"]',
        // Search overlay containers
        "#minicart-sidenav",
        // Minicart side nav
        "#minicartOverlay",
        // Minicart overlay
        "#search-sidenav",
        // Search side nav
        ".minicart-empty",
        // Empty cart message
        ".minicart-content",
        // Cart content
        ".form-minicart",
        // Cart form
        ".site-search",
        // Site search container
        ".recommendations",
        // Product recommendations
        ".search",
        // Search container
        ".suggestions-wrapper"
        // Search suggestions wrapper
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        // Site header with announcement bar and logo
        "nav#balheadnav",
        // Main navigation
        ".menu-wrapper",
        // Mobile menu
        "footer#footercontent",
        // Site footer
        ".scroll-down-sign",
        // Scroll indicator
        ".bal-slider--nav",
        // Slider navigation dots
        ".spacer",
        // Empty spacer divs
        "noscript",
        // NoScript tags
        "link",
        // Link tags
        "iframe",
        // Tracking iframes
        ".product-tile",
        // Product recommendation tiles
        ".bal-search-layer",
        // Search layer
        ".search-suggestions",
        // Search suggestions
        ".bal-minicart"
        // Minicart container
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-frz-flags");
        el.removeAttribute("data-frz-version");
        el.removeAttribute("data-scrolltop");
      });
    }
  }

  // tools/importer/transformers/balmain-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const document = element.ownerDocument;
      const sectionDefs = [
        { cls: "experience-bal_layouts-bal_mainslider", occurrence: 0, style: null },
        // Hero SS26
        { cls: "experience-bal_layouts-bal_flexible_layout", occurrence: 0, style: null },
        // Spring Offers
        { cls: "experience-bal_layouts-bal_carousel_classic", occurrence: 0, style: null },
        // Product Carousel
        { cls: "experience-bal_layouts-bal_flexible_layout", occurrence: 1, style: null },
        // Sneakers+Mens
        { cls: "experience-bal_layouts-bal_mainslider", occurrence: 1, style: null },
        // Hero FW26
        { cls: "experience-bal_layouts-bal_culture_layout", occurrence: 0, style: null },
        // Culture
        { cls: "experience-bal_assets-bal_newslatter_singup", occurrence: 0, style: null },
        // Newsletter
        { cls: "experience-bal_assets-bal_reinsurance", occurrence: 0, style: null }
        // Info Cards
      ];
      const resolved = sectionDefs.map((def) => {
        const all = [...element.querySelectorAll(`.${def.cls}`)];
        return { el: all[def.occurrence] || null, style: def.style };
      });
      for (let i = resolved.length - 1; i >= 0; i--) {
        const { el, style } = resolved[i];
        if (!el) continue;
        if (style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style }
          });
          el.after(metaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          el.before(hr);
        }
      }
    }
  }

  // tools/importer/import-balmain-homepage.js
  var parsers = {
    "hero-fullbleed": parse,
    "cards-product": parse2,
    "carousel-product": parse3,
    "form": parse4
  };
  var PAGE_TEMPLATE = {
    name: "balmain-homepage",
    description: "Balmain Germany homepage with hero banners, product category cards, carousels, newsletter signup, and info cards",
    urls: [
      "https://de.balmain.com/de"
    ],
    blocks: [
      {
        name: "hero-fullbleed",
        instances: [".bal-container.bal-main--slider .bal-slide"]
      },
      {
        name: "cards-product",
        instances: [".bal-flexible--layout.style-50-50-rectangle .bal-flexible--content"]
      },
      {
        name: "carousel-product",
        instances: ["section.carousel_classic", "section.bal-culture"]
      },
      {
        name: "form",
        instances: [".experience-component.experience-bal_assets-bal_newslatter_singup .footer_signup"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero SS26",
        selector: ".experience-component.experience-bal_layouts-bal_mainslider:first-of-type",
        style: null,
        blocks: ["hero-fullbleed"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Spring Offers Cards",
        selector: ".experience-component.experience-bal_layouts-bal_flexible_layout:first-of-type",
        style: null,
        blocks: ["cards-product"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Product Carousel",
        selector: ".experience-component.experience-bal_layouts-bal_carousel_classic",
        style: null,
        blocks: ["carousel-product"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Sneakers and Mens Cards",
        selector: ".experience-component.experience-bal_layouts-bal_flexible_layout:nth-of-type(2)",
        style: null,
        blocks: ["cards-product"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Hero FW26",
        selector: ".experience-component.experience-bal_layouts-bal_mainslider:nth-of-type(2)",
        style: null,
        blocks: ["hero-fullbleed"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Balmain Culture",
        selector: ".experience-component.experience-bal_layouts-bal_culture_layout",
        style: null,
        blocks: ["carousel-product"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Newsletter Signup",
        selector: ".experience-component.experience-bal_assets-bal_newslatter_singup",
        style: null,
        blocks: ["form"],
        defaultContent: []
      },
      {
        id: "section-8",
        name: "Info Cards",
        selector: ".experience-component.experience-bal_assets-bal_reinsurance",
        style: null,
        blocks: ["cards-product"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_balmain_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_balmain_homepage_exports);
})();
