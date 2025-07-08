
import { OfferData, TemplateVariation, TEMPLATE_VARIATIONS, CustomColors, CTAButton, LAYOUT_TEMPLATES, TypographySettings, getTypographyCSS, DEFAULT_TYPOGRAPHY } from './types';

// Layout-specific content generators
function generateClassicSideLayout(data: OfferData, hasPrice: boolean, hasApr: boolean, hasAprCash: boolean, colors: { vehicleTitle: string; offers: string; cta: string }): string {
  const perMonthText = data.perMonthText || 'per month';
  const orText = data.orText || 'OR';
  const aprAvailableText = data.aprAvailableText || 'APR Available';
  
  // Always show side-by-side layout with price OR APR
  if (hasPrice && hasApr) {
    return `
      <div class="offer-option">
        <div class="price">${data.price}</div>
        <div class="price-detail">${perMonthText}</div>
      </div>
      <div class="or">${orText}</div>
      <div class="offer-option">
        <div class="price">${data.apr}</div>
        <div class="price-detail">${aprAvailableText}</div>
        ${hasAprCash ? `<div class="loyalty-bonus">${data.aprCash}</div>` : ''}
      </div>`;
  } else if (hasPrice) {
    return `
      <div class="offer-option single-centered">
        <div class="price large-single">${data.price}</div>
        <div class="price-detail">${perMonthText}</div>
      </div>`;
  } else if (hasApr) {
    return `
      <div class="offer-option single-centered">
        <div class="price large-single">${data.apr}</div>
        <div class="price-detail">${aprAvailableText}</div>
        ${hasAprCash ? `<div class="loyalty-bonus">${data.aprCash}</div>` : ''}
      </div>`;
  }
  
  return `
    <div class="offer-option single-centered">
      <div class="price">PRICE</div>
      <div class="price-detail">${perMonthText}</div>
    </div>`;
}

function generateBonusFocusLayout(data: OfferData, hasPrice: boolean, hasApr: boolean, hasAprCash: boolean, colors: { vehicleTitle: string; offers: string; cta: string }): string {
  const perMonthText = data.perMonthText || 'per month';
  const aprAvailableText = data.aprAvailableText || 'APR Available';
  
  // Prioritize bonus cash display
  if (hasAprCash) {
    return `
      <div class="bonus-focus-layout">
        <div class="offer-option bonus-primary">
          <div class="loyalty-bonus large-bonus">${data.aprCash}</div>
        </div>
        ${hasPrice ? `
        <div class="offer-option bonus-secondary">
          <div class="price">${data.price}</div>
          <div class="price-detail">${perMonthText}</div>
        </div>` : ''}
        ${hasApr && !hasPrice ? `
        <div class="offer-option bonus-secondary">
          <div class="price">${data.apr}</div>
          <div class="price-detail">${aprAvailableText}</div>
        </div>` : ''}
      </div>`;
  }
  
  // Fallback to regular layout if no bonus
  return generateClassicSideLayout(data, hasPrice, hasApr, hasAprCash, colors);
}

function generateStackedLayout(data: OfferData, hasPrice: boolean, hasApr: boolean, hasAprCash: boolean, colors: { vehicleTitle: string; offers: string; cta: string }): string {
  const perMonthText = data.perMonthText || 'per month';
  const aprAvailableText = data.aprAvailableText || 'APR Available';
  
  let stackedItems = [];
  
  if (hasPrice) {
    stackedItems.push(`
      <div class="offer-option stacked-item">
        <div class="price">${data.price}</div>
        <div class="price-detail">${perMonthText}</div>
      </div>`);
  }
  
  if (hasApr) {
    stackedItems.push(`
      <div class="offer-option stacked-item">
        <div class="price">${data.apr}</div>
        <div class="price-detail">${aprAvailableText}</div>
      </div>`);
  }
  
  if (hasAprCash) {
    stackedItems.push(`
      <div class="offer-option stacked-item">
        <div class="loyalty-bonus">${data.aprCash}</div>
      </div>`);
  }
  
  if (stackedItems.length === 0) {
    stackedItems.push(`
      <div class="offer-option stacked-item">
        <div class="price">PRICE</div>
        <div class="price-detail">${perMonthText}</div>
      </div>`);
  }
  
  return `<div class="stacked-layout">${stackedItems.join('')}</div>`;
}

function generateMinimalSingleLayout(data: OfferData, hasPrice: boolean, hasApr: boolean, hasAprCash: boolean, colors: { vehicleTitle: string; offers: string; cta: string }): string {
  const perMonthText = data.perMonthText || 'per month';
  const aprAvailableText = data.aprAvailableText || 'APR Available';
  
  // Show only the most important single offer
  if (hasPrice) {
    return `
      <div class="minimal-single-layout">
        <div class="offer-option single-centered">
          <div class="price minimal-large">${data.price}</div>
          <div class="price-detail">${perMonthText}</div>
        </div>
      </div>`;
  } else if (hasApr) {
    return `
      <div class="minimal-single-layout">
        <div class="offer-option single-centered">
          <div class="price minimal-large">${data.apr}</div>
          <div class="price-detail">${aprAvailableText}</div>
        </div>
      </div>`;
  } else if (hasAprCash) {
    return `
      <div class="minimal-single-layout">
        <div class="offer-option single-centered">
          <div class="loyalty-bonus minimal-large">${data.aprCash}</div>
        </div>
      </div>`;
  }
  
  return `
    <div class="minimal-single-layout">
      <div class="offer-option single-centered">
        <div class="price minimal-large">SPECIAL OFFER</div>
        <div class="price-detail">Contact for Details</div>
      </div>
    </div>`;
}

// Generate dynamic offer details content based on filled fields and layout template
function generateOfferDetailsContent(data: OfferData, hasPrice: boolean, hasApr: boolean, hasAprCash: boolean, colors: { vehicleTitle: string; offers: string; cta: string }): string {
  const layoutTemplate = data.layoutTemplate || 'adaptive-auto';
  
  switch (layoutTemplate) {
    case 'classic-side':
      return generateClassicSideLayout(data, hasPrice, hasApr, hasAprCash, colors);
    
    case 'bonus-focus':
      return generateBonusFocusLayout(data, hasPrice, hasApr, hasAprCash, colors);
    
    case 'stacked-layout':
      return generateStackedLayout(data, hasPrice, hasApr, hasAprCash, colors);
    
    case 'minimal-single':
      return generateMinimalSingleLayout(data, hasPrice, hasApr, hasAprCash, colors);
    
    case 'adaptive-auto':
    default:
      // Keep the original adaptive behavior as default
      return generateAdaptiveLayout(data, hasPrice, hasApr, hasAprCash, colors);
  }
}

// Original adaptive layout logic (renamed from generateOfferDetailsContent)
function generateAdaptiveLayout(data: OfferData, hasPrice: boolean, hasApr: boolean, hasAprCash: boolean, colors: { vehicleTitle: string; offers: string; cta: string }): string {
  const filledFieldsCount = [hasPrice, hasApr, hasAprCash].filter(Boolean).length;
  
  // Use customizable text or defaults
  const perMonthText = data.perMonthText || 'per month';
  const orText = data.orText || 'OR';
  const aprAvailableText = data.aprAvailableText || 'APR Available';
  
  // If no fields are filled, show placeholder for preview
  if (filledFieldsCount === 0) {
    return `
        <div class="offer-option single-centered">
          <div class="price">PRICE</div>
          <div class="price-detail">${perMonthText}</div>
        </div>
        <div class="or">${orText}</div>
        <div class="offer-option">
          <div class="price">APR</div>
          <div class="price-detail">${aprAvailableText}</div>
          <div class="loyalty-bonus">BONUS</div>
        </div>`;
  }
  
  // Single field scenarios
  if (filledFieldsCount === 1) {
    if (hasPrice) {
      return `
        <div class="offer-option single-centered">
          <div class="price large-single">${data.price}</div>
          <div class="price-detail">${perMonthText}</div>
        </div>`;
    }
    if (hasApr) {
      return `
        <div class="offer-option single-centered">
          <div class="price large-single">${data.apr}</div>
          <div class="price-detail">${aprAvailableText}</div>
        </div>`;
    }
    if (hasAprCash) {
      return `
        <div class="offer-option single-centered">
          <div class="loyalty-bonus large-single">${data.aprCash}</div>
        </div>`;
    }
  }
  
  // Two field scenarios
  if (filledFieldsCount === 2) {
    if (hasPrice && hasApr) {
      // Payment OR APR side by side
      return `
        <div class="offer-option">
          <div class="price">${data.price}</div>
          <div class="price-detail">${perMonthText}</div>
        </div>
        <div class="or">${orText}</div>
        <div class="offer-option">
          <div class="price">${data.apr}</div>
          <div class="price-detail">${aprAvailableText}</div>
        </div>`;
    }
    if (hasPrice && hasAprCash) {
      // Payment on top, bonus below
      return `
        <div class="offer-stack">
          <div class="offer-option">
            <div class="price">${data.price}</div>
            <div class="price-detail">${perMonthText}</div>
          </div>
          <div class="offer-option">
            <div class="loyalty-bonus">${data.aprCash}</div>
          </div>
        </div>`;
    }
    if (hasApr && hasAprCash) {
      // APR on top, bonus below
      return `
        <div class="offer-stack">
          <div class="offer-option">
            <div class="price">${data.apr}</div>
            <div class="price-detail">${aprAvailableText}</div>
          </div>
          <div class="offer-option">
            <div class="loyalty-bonus">${data.aprCash}</div>
          </div>
        </div>`;
    }
  }
  
  // All three fields - Payment OR APR + bonus
  if (filledFieldsCount === 3) {
    return `
        <div class="offer-option">
          <div class="price">${data.price}</div>
          <div class="price-detail">${perMonthText}</div>
        </div>
        <div class="or">${orText}</div>
        <div class="offer-option">
          <div class="price">${data.apr}</div>
          <div class="price-detail">${aprAvailableText}</div>
          <div class="loyalty-bonus">${data.aprCash}</div>
        </div>`;
  }
  
  return '';
}

// Generate CTA buttons HTML
function generateCTAButtons(data: OfferData, colors: { vehicleTitle: string; offers: string; cta: string }): string {
  const ctaButtons = data.ctaButtons || [];
  
  // If no CTA buttons defined, fall back to legacy ctaLink
  if (ctaButtons.length === 0 && data.ctaLink) {
    const makeModel = [data.make, data.model].filter(Boolean).join(' ') || 'Inventory';
    return `<a href="${data.ctaLink}" class="cta cta-medium cta-rounded pulse">
      View ${makeModel} <span class="icon">→</span>
    </a>`;
  }
  
  // Generate buttons from ctaButtons array
  return ctaButtons.map(cta => {
    const link = cta.link || data.ctaLink || '#';
    const text = cta.text || 'SHOP NOW';
    const sizeClass = `cta-${cta.size || 'medium'}`;
    const styleClass = `cta-${cta.style || 'rounded'}`;
    
    return `<a href="${link}" class="cta ${sizeClass} ${styleClass} pulse">
      ${text} <span class="icon">→</span>
    </a>`;
  }).join(' ');
}

// Phase 3: Enhanced Auto-generate disclaimer summary from full disclaimer
function generateDisclaimerSummary(data: OfferData): string {
  const { modelYear, make, model, fullDisclaimer } = data;
  
  // Extract expiration date from disclaimer
  const datePatterns = [
    /expires?\s+(\d{1,2}\/\d{1,2}\/\d{2,4})/i,
    /through\s+(\d{1,2}\/\d{1,2}\/\d{2,4})/i,
    /until\s+(\d{1,2}\/\d{1,2}\/\d{2,4})/i,
    /by\s+(\d{1,2}\/\d{1,2}\/\d{2,4})/i,
    /expires?\s+(\w+\s+\d{1,2},?\s+\d{4})/i,
    /through\s+(\w+\s+\d{1,2},?\s+\d{4})/i
  ];
  
  let expirationDate = '';
  for (const pattern of datePatterns) {
    const match = fullDisclaimer?.match?.(pattern);
    if (match) {
      expirationDate = match[1];
      break;
    }
  }
  
  const yearText = modelYear || 'YEAR';
  const makeText = make || 'MAKE';
  const modelText = model || 'MODEL';
  
  const vehicleDescription = [yearText, makeText, modelText].filter(text => text !== 'YEAR' && text !== 'MAKE' && text !== 'MODEL').join(' ') || `${yearText} ${makeText} ${modelText}`;
  
  if (expirationDate) {
    return `Available on select new ${vehicleDescription} models. Expires ${expirationDate}.`;
  } else {
    return `Available on select new ${vehicleDescription} models.`;
  }
}

// Phase 3: Generate disclaimer content based on settings
function generateDisclaimerContent(data: OfferData, colors: { vehicleTitle: string; offers: string; cta: string }): string {
  const disclaimerSettings = data.disclaimerSettings;
  const fullDisclaimer = data.fullDisclaimer || 'Disclaimer text will appear here.';
  
  // If no settings, use auto behavior (default)
  if (!disclaimerSettings || disclaimerSettings.displayMode === 'auto') {
    const disclaimerSummary = generateDisclaimerSummary(data);
    return `
      <div class="disclaimer-container">
        <div class="disclaimer-summary">
          *${disclaimerSummary}
          ${disclaimerSettings?.showToggle !== false ? `
          <span class="disclaimer-toggle" onclick="
            const c=this.closest('.disclaimer-container'),
                  f=c.querySelector('.disclaimer-full');
            f.classList.toggle('active');
            this.textContent = f.classList.contains('active') ? 'Hide Details' : 'See Details';
          ">See Details</span>` : ''}
        </div>
        ${disclaimerSettings?.showToggle !== false ? `<div class="disclaimer-full">${fullDisclaimer}</div>` : ''}
      </div>`;
  }
  
  // Full disclaimer mode
  if (disclaimerSettings.displayMode === 'full') {
    return `
      <div class="disclaimer-container">
        <div class="disclaimer-full active" style="display: block;">*${fullDisclaimer}</div>
      </div>`;
  }
  
  // Truncated mode
  if (disclaimerSettings.displayMode === 'truncated') {
    const truncatedText = disclaimerSettings.autoGenerateSummary 
      ? generateDisclaimerSummary(data)
      : (disclaimerSettings.customTruncatedText || generateDisclaimerSummary(data));
    
    return `
      <div class="disclaimer-container">
        <div class="disclaimer-summary">
          *${truncatedText}
          ${disclaimerSettings.showToggle ? `
          <span class="disclaimer-toggle" onclick="
            const c=this.closest('.disclaimer-container'),
                  f=c.querySelector('.disclaimer-full');
            f.classList.toggle('active');
            this.textContent = f.classList.contains('active') ? 'Hide Details' : 'See Details';
          ">See Details</span>` : ''}
        </div>
        ${disclaimerSettings.showToggle ? `<div class="disclaimer-full">${fullDisclaimer}</div>` : ''}
      </div>`;
  }
  
  // Fallback to auto mode
  const disclaimerSummary = generateDisclaimerSummary(data);
  return `
    <div class="disclaimer-container">
      <div class="disclaimer-summary">
        *${disclaimerSummary}
        <span class="disclaimer-toggle" onclick="
          const c=this.closest('.disclaimer-container'),
                f=c.querySelector('.disclaimer-full');
          f.classList.toggle('active');
          this.textContent = f.classList.contains('active') ? 'Hide Details' : 'See Details';
        ">See Details</span>
      </div>
      <div class="disclaimer-full">${fullDisclaimer}</div>
    </div>`;
}

export function generateOfferHTML(data: OfferData, variationId: string = 'classic', customColors?: CustomColors): string {
  const variation = TEMPLATE_VARIATIONS.find(v => v.id === variationId) || TEMPLATE_VARIATIONS[0];
  
  // Use custom colors if provided and template is custom
  const colors = variationId === 'custom' && customColors ? {
    vehicleTitle: customColors.vehicleTitle,
    offers: customColors.offers,
    cta: customColors.cta
  } : {
    vehicleTitle: variation.primaryColor,
    offers: variation.primaryColor,
    cta: variation.primaryColor
  };

  // Get typography settings and CSS
  const typography = data.typography || DEFAULT_TYPOGRAPHY;
  const typographyCSS = getTypographyCSS(typography);
  
  // Use placeholders for missing fields only for display purposes
  const modelYear = data.modelYear || 'YEAR';
  const make = data.make || 'MAKE';
  const model = data.model || 'MODEL';
  
  // Generate custom header text with placeholders replaced
  let headerText = data.headerText || 'NEW {YEAR} {MAKE} {MODEL} MODELS';
  headerText = headerText.replace('{YEAR}', modelYear).replace('{MAKE}', make).replace('{MODEL}', model);
  
  // Check which fields have actual data (not empty/placeholder)
  const hasPrice = Boolean(data.price && data.price.trim() !== '');
  const hasApr = Boolean(data.apr && data.apr.trim() !== '');
  const hasAprCash = Boolean(data.aprCash && data.aprCash.trim() !== '');
  
  // Generate dynamic offer details based on available data
  const offerDetailsContent = generateOfferDetailsContent(data, hasPrice, hasApr, hasAprCash, colors);
  
  // Generate CTA buttons
  const ctaButtonsHTML = generateCTAButtons(data, colors);
  
  // Generate promotional badge if provided
  const promotionalBadge = data.promotionalBadge ? 
    `<div class="promotional-badge">${data.promotionalBadge}</div>` : '';
  
  // Generate dealer info if provided
  const dealerInfo = (data.dealerName || data.dealerLocation) ? 
    `<div class="dealer-info">
      ${data.dealerName ? `<div class="dealer-name">${data.dealerName}</div>` : ''}
      ${data.dealerLocation ? `<div class="dealer-location">${data.dealerLocation}</div>` : ''}
    </div>` : '';
  
  // Generate footer text if provided
  const footerText = data.footerText ? 
    `<div class="footer-text">${data.footerText}</div>` : '';
  
  // Phase 3: Generate disclaimer content using enhanced settings
  const disclaimerContent = generateDisclaimerContent(data, colors);
  
  const baseTemplate = `<!DOCTYPE html>
<html>
<head>
  <title>${modelYear} ${make} ${model} Models</title>
  <style>
    body{font-family:Arial,sans-serif;padding:10px;background:${variation.backgroundColor}}
    .offer-container{max-width:500px;margin:0 auto;position:relative}
    .promotional-badge{position:absolute;top:-5px;right:-5px;background:${colors.cta};color:#fff;padding:4px 8px;font-size:10px;font-weight:bold;border-radius:12px;z-index:10;transform:rotate(15deg)}
    .offer-header{background:#fff;border-radius:8px 8px 0 0;padding:12px 10px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05)}
    .model-name{font-size:${typographyCSS.header.fontSize};font-weight:${typographyCSS.header.fontWeight};color:${colors.vehicleTitle};margin-bottom:8px}
    .offer-details{display:flex;justify-content:center;align-items:center;gap:15px}
    .offer-option{text-align:center}
    .price{font-size:${typographyCSS.price.fontSize};font-weight:${typographyCSS.price.fontWeight};color:${colors.offers};line-height:1.1}
    .price-detail{font-size:${typographyCSS.description.fontSize};font-weight:${typographyCSS.description.fontWeight};color:#777;margin-top:1px}
    .or{font-size:14px;font-weight:bold;color:#555}
    .loyalty-bonus{font-size:calc(${typographyCSS.price.fontSize} * 0.8);font-weight:${typographyCSS.price.fontWeight};color:${colors.offers};margin-top:3px;line-height:1.1}
    
    /* Single item centering styles */
    .single-centered{flex:1;max-width:100%}
    .large-single{font-size:calc(${typographyCSS.price.fontSize} * 1.3) !important}
    
    /* Stacked layout for two items */
    .offer-stack{display:flex;flex-direction:column;align-items:center;gap:8px}
    .offer-stack .offer-option{margin:0}
    
    /* Layout Template Styles */
    
    /* Bonus Focus Layout */
    .bonus-focus-layout{display:flex;flex-direction:column;align-items:center;gap:12px}
    .bonus-primary{order:1;margin-bottom:8px}
    .bonus-secondary{order:2;font-size:0.9em}
    .large-bonus{font-size:calc(${typographyCSS.price.fontSize} * 1.1) !important;font-weight:${typographyCSS.price.fontWeight};color:${colors.offers};padding:8px 0}
    
    /* Stacked Layout */
    .stacked-layout{display:flex;flex-direction:column;align-items:center;gap:10px;max-width:300px;margin:0 auto}
    .stacked-item{width:100%;text-align:center;padding:6px 0;border-bottom:1px solid #eee}
    .stacked-item:last-child{border-bottom:none}
    
    /* Minimal Single Layout */
    .minimal-single-layout{display:flex;justify-content:center;align-items:center;min-height:80px}
    .minimal-large{font-size:calc(${typographyCSS.price.fontSize} * 1.5) !important;font-weight:${typographyCSS.price.fontWeight};line-height:1.2}

    .cta-container{text-align:center;background:#f0f0f0;padding:12px 10px;border-radius:0 0 8px 8px;box-shadow:0 2px 8px rgba(0,0,0,0.05)}
    .cta{display:inline-block;color:#fff;background:${colors.cta};text-decoration:none;font-weight:${typographyCSS.cta.fontWeight};transition:all .3s ease;box-shadow:0 3px 5px rgba(0,0,0,0.2);margin:2px}
    .cta:hover{transform:translateY(-2px);box-shadow:0 5px 10px rgba(0,0,0,0.3);background:${getDarkerColor(colors.cta)}}
    .cta:active{transform:translateY(1px);box-shadow:0 2px 3px rgba(0,0,0,0.3)}
    .cta .icon{margin-left:5px;transition:transform .3s ease}
    .cta:hover .icon{transform:translateX(3px)}
    
    /* CTA Size Variations - Base typography applied, with size adjustments */
    .cta-small{padding:6px 12px;font-size:calc(${typographyCSS.cta.fontSize} * 0.8)}
    .cta-medium{padding:10px 22px;font-size:${typographyCSS.cta.fontSize}}
    .cta-large{padding:14px 28px;font-size:calc(${typographyCSS.cta.fontSize} * 1.2)}
    
    /* CTA Style Variations */
    .cta-rounded{border-radius:25px}
    .cta-square{border-radius:4px}
    
    @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(0,0,0,0.6)}70%{box-shadow:0 0 0 8px rgba(0,0,0,0)}100%{box-shadow:0 0 0 0 rgba(0,0,0,0)}}
    .pulse{animation:pulse 2s infinite}

    .dealer-info{margin-top:8px;font-size:11px;color:#666}
    .dealer-name{font-weight:bold}
    .dealer-location{margin-top:2px}
    .footer-text{margin-top:8px;font-size:12px;color:#555;font-style:italic}

    .disclaimer-container{margin-top:8px;text-align:center}
    .disclaimer-summary{font-size:11px;color:#666;cursor:pointer;transition:color .2s ease}
    .disclaimer-summary:hover{color:${colors.cta}}
    .disclaimer-toggle{display:inline-block;border:none;background:transparent;color:${colors.cta};font-size:11px;cursor:pointer;margin-left:3px;font-weight:bold;text-decoration:underline}
    .disclaimer-full{display:none;font-size:10px;line-height:1.3;color:#666;text-align:left;padding:8px;border:1px solid #ddd;border-radius:6px;background:#fff;margin-top:8px;max-height:120px;overflow-y:auto}
    .disclaimer-full.active{display:block}

    @media(max-width:480px){
      .offer-details{flex-direction:column;gap:5px}
      .or{margin:3px 0}
      .offer-header{padding:10px 8px}
      .cta-container{padding:10px 8px}
      .offer-stack{gap:5px}
      .promotional-badge{font-size:9px;padding:3px 6px}
    }
  </style>
</head>
<body>
  <div class="offer-container">
    ${promotionalBadge}
    <div class="offer-header">
      <div class="model-name">${headerText}</div>
      <div class="offer-details">${offerDetailsContent}
      </div>
    </div>
    <div class="cta-container">
      ${ctaButtonsHTML}
      ${dealerInfo}
      ${footerText}
      ${disclaimerContent}
    </div>
  </div>
  <script>
    const btns = document.querySelectorAll('.cta');
    btns.forEach(btn => {
      setTimeout(()=>btn.classList.remove('pulse'),5000);
      btn.addEventListener('mouseleave',()=>{
        setTimeout(()=>{
          btn.classList.add('pulse');
          setTimeout(()=>btn.classList.remove('pulse'),5000);
        },1000);
      });
    });
  </script>
</body>
</html>`;

  return baseTemplate;
}

function getDarkerColor(color: string): string {
  // Simple color darkening for hover effects
  const colorMap: { [key: string]: string } = {
    '#EB0A1E': '#ff1c32',
    '#22C55E': '#16A34A',
    '#3B82F6': '#2563EB',
    '#F59E0B': '#D97706',
    '#8B5CF6': '#7C3AED'
  };
  
  if (colorMap[color]) {
    return colorMap[color];
  }
  
  // For custom colors, try to darken by converting hex to RGB and darkening
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Darken by 20%
    const darkerR = Math.max(0, Math.floor(r * 0.8));
    const darkerG = Math.max(0, Math.floor(g * 0.8));
    const darkerB = Math.max(0, Math.floor(b * 0.8));
    
    return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
  }
  
  return color;
}

export function generateMultipleOffersHTML(offers: OfferData[], variationId: string = 'classic', customColors?: CustomColors): string {
  const individualOffers = offers.map(offer => generateOfferHTML(offer, variationId, customColors)).join('\n\n');
  
  return `<!DOCTYPE html>
<html>
<head>
  <title>Automotive Offers Collection</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f8f8f8;
      margin: 0;
      padding: 20px 0;
    }
    .offers-collection {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .collection-header {
      text-align: center;
      margin-bottom: 30px;
    }
    .collection-title {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }
    .collection-subtitle {
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="offers-collection">
    <div class="collection-header">
      <h1 class="collection-title">Automotive Offers Collection</h1>
      <p class="collection-subtitle">Generated on ${new Date().toLocaleDateString()} with Phase 3 Enhanced Features</p>
    </div>
    ${individualOffers}
  </div>
</body>
</html>`;
}
