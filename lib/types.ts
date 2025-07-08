


export interface CTAButton {
  id: string;
  text: string;
  link: string;
  style: 'rounded' | 'square';
  size: 'small' | 'medium' | 'large';
}

// Typography control interfaces
export interface TypographySettings {
  headerSize: 'small' | 'medium' | 'large' | 'extra-large';
  headerWeight: 'normal' | 'bold' | 'extra-bold';
  priceSize: 'small' | 'medium' | 'large' | 'extra-large';
  priceWeight: 'normal' | 'bold' | 'extra-bold';
  descriptionSize: 'small' | 'medium' | 'large' | 'extra-large';
  descriptionWeight: 'normal' | 'bold' | 'extra-bold';
  ctaSize: 'small' | 'medium' | 'large' | 'extra-large';
  ctaWeight: 'normal' | 'bold' | 'extra-bold';
}

// UI state management
export interface UIPreferences {
  instructionsExpanded: boolean;
  expertMode: boolean;
  collapsedOffers: string[]; // Array of offer IDs that are collapsed
}

// Typography presets
export interface TypographyPreset {
  id: string;
  name: string;
  description: string;
  settings: TypographySettings;
}

export interface OfferData {
  id: string;
  modelYear: string;
  make: string;
  model: string;
  price: string;
  apr: string;
  aprCash: string;
  ctaLink: string;
  fullDisclaimer: string;
  
  // Layout Template Selection
  layoutTemplate: string;
  
  // Color Theme Selection
  selectedVariation: string;
  customColors?: CustomColors;
  
  // CTA Customizations
  ctaButtons: CTAButton[];
  
  // Typography Customizations
  typography?: TypographySettings;
  
  // Verbiage Customizations
  headerText: string;
  promotionalBadge: string;
  footerText: string;
  dealerName: string;
  dealerLocation: string;
  
  // Editable Text Elements
  perMonthText: string;
  orText: string;
  aprAvailableText: string;
  
  // Phase 3: Enhanced Disclaimer Options
  disclaimerSettings?: DisclaimerSettings;
  
  // Phase 3: Image Upload (Beta)
  vehicleImage?: VehicleImage;
}

export interface CustomColors {
  vehicleTitle: string;
  offers: string;
  cta: string;
}

// Phase 3: Enhanced Disclaimer Options
export interface DisclaimerSettings {
  displayMode: 'truncated' | 'full' | 'auto'; // auto = current behavior
  customTruncatedText?: string; // User-defined truncated text
  showToggle: boolean; // Whether to show "See Details" toggle
  autoGenerateSummary: boolean; // Use auto-generated summary vs custom
}

// Phase 3: Image Upload (Beta)
export interface VehicleImage {
  id: string;
  filename: string;
  url?: string; // Will be populated when feature is complete
  altText: string;
  isPlaceholder: boolean; // True for beta placeholder
}

// Phase 3: Download Configuration
export interface DownloadOptions {
  format: 'html' | 'txt' | 'both';
  includeInlineCSS: boolean;
  includeTimestamp: boolean;
  customFilename?: string;
}

// Phase 3: Enhanced Dealer Information
export interface DealerInformation {
  name: string;
  location: string;
  phone?: string;
  website?: string;
  address?: string;
  hours?: string;
  logo?: string; // URL to dealer logo
}

export interface TemplateVariation {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  category?: 'brand' | 'seasonal' | 'custom';
}

export interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}

// Quick-fill data for common values
export const QUICK_FILL_DATA = {
  modelYears: ['2024', '2025', '2026'],
  popularMakes: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Jeep', 'Mazda', 'Subaru'],
  standardAPRs: ['2.99%', '3.99%', '4.99%', '5.99%', '6.99%'],
  commonBonusAmounts: ['$500 CASH BACK', '$1000 CASH BACK', '$1500 CASH BACK', '$2000 CASH BACK', 'PLUS $500 BONUS CASH', 'PLUS $1000 BONUS CASH']
};

// Layout Templates
export const LAYOUT_TEMPLATES: LayoutTemplate[] = [
  {
    id: 'classic-side',
    name: 'Classic Side-by-Side',
    description: 'Traditional price OR APR side by side layout',
    preview: '[$299] OR [2.9% APR]'
  },
  {
    id: 'bonus-focus',
    name: 'Bonus Focus',
    description: 'Large bonus cash prominently displayed',
    preview: '[BONUS CASH] + [$299/mo]'
  },
  {
    id: 'stacked-layout',
    name: 'Stacked Layout',
    description: 'Vertical arrangement of all offers',
    preview: '[$299] \n [2.9% APR] \n [BONUS]'
  },
  {
    id: 'minimal-single',
    name: 'Minimal Single',
    description: 'One main offer with clean design',
    preview: '[$299/month]'
  },
  {
    id: 'adaptive-auto',
    name: 'Adaptive Auto',
    description: 'Automatically adjusts layout based on content',
    preview: '[Smart Layout]'
  }
];

// Automotive Brand Color Schemes (Based on authentic brand guidelines)
export const BRAND_COLORS: TemplateVariation[] = [
  // American Brands
  {
    id: 'toyota',
    name: 'Toyota',
    description: 'Official Toyota red and styling',
    primaryColor: '#EB0A1E',
    secondaryColor: '#58595B',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'ford',
    name: 'Ford',
    description: 'Ford blue heritage styling',
    primaryColor: '#003478',
    secondaryColor: '#333333',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'chevrolet',
    name: 'Chevrolet',
    description: 'Chevy golden sand and grey',
    primaryColor: '#C5B358',
    secondaryColor: '#A3A3A3',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'honda',
    name: 'Honda',
    description: 'Honda blue heritage styling',
    primaryColor: '#0066CC',
    secondaryColor: '#333333',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'nissan',
    name: 'Nissan',
    description: 'Nissan red and black design',
    primaryColor: '#C3002F',
    secondaryColor: '#000000',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'bmw',
    name: 'BMW',
    description: 'BMW blue luxury styling',
    primaryColor: '#0166B1',
    secondaryColor: '#6F6F6F',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    description: 'Mercedes black and silver elegance',
    primaryColor: '#000000',
    secondaryColor: '#A4AAAE',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'audi',
    name: 'Audi',
    description: 'Audi progressive red styling',
    primaryColor: '#F50537',
    secondaryColor: '#333333',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'lexus',
    name: 'Lexus',
    description: 'Lexus luxury silver and black',
    primaryColor: '#000000',
    secondaryColor: '#DFE1E0',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'acura',
    name: 'Acura',
    description: 'Acura precision black and grey',
    primaryColor: '#000000',
    secondaryColor: '#9E999F',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'infiniti',
    name: 'Infiniti',
    description: 'Infiniti dark blue luxury',
    primaryColor: '#020B24',
    secondaryColor: '#A5A5A5',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'cadillac',
    name: 'Cadillac',
    description: 'Cadillac deep red and gold',
    primaryColor: '#97140C',
    secondaryColor: '#CBAA4D',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'jeep',
    name: 'Jeep',
    description: 'Jeep adventure green',
    primaryColor: '#424D07',
    secondaryColor: '#333333',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'mazda',
    name: 'Mazda',
    description: 'Mazda black and grey elegance',
    primaryColor: '#000000',
    secondaryColor: '#666666',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  },
  {
    id: 'subaru',
    name: 'Subaru',
    description: 'Subaru confidence blue',
    primaryColor: '#14478A',
    secondaryColor: '#B3B5B5',
    backgroundColor: '#f8f8f8',
    category: 'brand'
  }
];

// Seasonal Color Schemes (Enhanced)
export const SEASONAL_COLORS: TemplateVariation[] = [
  {
    id: 'spring',
    name: 'Spring Fresh',
    description: 'Fresh green with renewal energy',
    primaryColor: '#22C55E',
    secondaryColor: '#333333',
    backgroundColor: '#f8fff8',
    category: 'seasonal'
  },
  {
    id: 'summer',
    name: 'Summer Bright',
    description: 'Vibrant blue for summer sales',
    primaryColor: '#3B82F6',
    secondaryColor: '#333333',
    backgroundColor: '#f8fbff',
    category: 'seasonal'
  },
  {
    id: 'fall',
    name: 'Fall Harvest',
    description: 'Warm amber for autumn promotions',
    primaryColor: '#F59E0B',
    secondaryColor: '#333333',
    backgroundColor: '#fffbf8',
    category: 'seasonal'
  },
  {
    id: 'winter',
    name: 'Winter Elegance',
    description: 'Cool purple for winter offers',
    primaryColor: '#8B5CF6',
    secondaryColor: '#333333',
    backgroundColor: '#fdfbff',
    category: 'seasonal'
  },
  {
    id: 'holiday',
    name: 'Holiday Special',
    description: 'Festive red and green combination',
    primaryColor: '#DC2626',
    secondaryColor: '#059669',
    backgroundColor: '#fef9f9',
    category: 'seasonal'
  },
  {
    id: 'new-year',
    name: 'New Year',
    description: 'Elegant gold and black for new year sales',
    primaryColor: '#EAB308',
    secondaryColor: '#1F2937',
    backgroundColor: '#fffef7',
    category: 'seasonal'
  }
];

// Combine all template variations
export const TEMPLATE_VARIATIONS: TemplateVariation[] = [
  // Keep classic for backward compatibility
  {
    id: 'classic',
    name: 'Classic Red',
    description: 'Traditional red automotive theme',
    primaryColor: '#EB0A1E',
    secondaryColor: '#333333',
    backgroundColor: '#f8f8f8'
  },
  ...BRAND_COLORS,
  ...SEASONAL_COLORS,
  {
    id: 'custom',
    name: 'Custom',
    description: 'Choose your own colors',
    primaryColor: '#EB0A1E',
    secondaryColor: '#333333',
    backgroundColor: '#f8f8f8',
    category: 'custom'
  }
];

// Helper function to get brand variation based on make
export function getBrandVariationByMake(make: string): TemplateVariation | null {
  if (!make) return null;
  
  const normalizedMake = make.toLowerCase().trim();
  return BRAND_COLORS.find(brand => brand.id === normalizedMake) || null;
}

// Helper function to get all available color options for dropdown
export function getColorDropdownOptions(): Array<{value: string; label: string; variation: TemplateVariation}> {
  return [
    {
      value: 'default',
      label: 'Default (Based on Make)',
      variation: TEMPLATE_VARIATIONS.find(v => v.id === 'classic')!
    },
    {
      value: 'classic',
      label: 'Classic Red',
      variation: TEMPLATE_VARIATIONS.find(v => v.id === 'classic')!
    },
    ...BRAND_COLORS.map(brand => ({
      value: brand.id,
      label: brand.name,
      variation: brand
    })),
    ...SEASONAL_COLORS.map(seasonal => ({
      value: seasonal.id,
      label: seasonal.name,
      variation: seasonal
    })),
    {
      value: 'custom',
      label: 'Custom Colors',
      variation: TEMPLATE_VARIATIONS.find(v => v.id === 'custom')!
    }
  ];
}

// Typography constants and helpers
export const TYPOGRAPHY_SIZES = {
  'small': { px: 12, label: 'Small (12px)' },
  'medium': { px: 16, label: 'Medium (16px)' },
  'large': { px: 20, label: 'Large (20px)' },
  'extra-large': { px: 24, label: 'Extra Large (24px)' }
} as const;

export const TYPOGRAPHY_WEIGHTS = {
  'normal': { value: 400, label: 'Normal' },
  'bold': { value: 600, label: 'Bold' },
  'extra-bold': { value: 800, label: 'Extra Bold' }
} as const;

// Default typography settings
export const DEFAULT_TYPOGRAPHY: TypographySettings = {
  headerSize: 'large',
  headerWeight: 'bold',
  priceSize: 'extra-large',
  priceWeight: 'extra-bold',
  descriptionSize: 'small',
  descriptionWeight: 'normal',
  ctaSize: 'medium',
  ctaWeight: 'bold'
};

// Typography presets
export const TYPOGRAPHY_PRESETS: TypographyPreset[] = [
  {
    id: 'conservative',
    name: 'Conservative',
    description: 'Traditional, professional styling',
    settings: {
      headerSize: 'medium',
      headerWeight: 'bold',
      priceSize: 'large',
      priceWeight: 'bold',
      descriptionSize: 'small',
      descriptionWeight: 'normal',
      ctaSize: 'medium',
      ctaWeight: 'bold'
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary styling',
    settings: {
      headerSize: 'large',
      headerWeight: 'bold',
      priceSize: 'extra-large',
      priceWeight: 'bold',
      descriptionSize: 'medium',
      descriptionWeight: 'normal',
      ctaSize: 'medium',
      ctaWeight: 'bold'
    }
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'High-impact, attention-grabbing',
    settings: {
      headerSize: 'extra-large',
      headerWeight: 'extra-bold',
      priceSize: 'extra-large',
      priceWeight: 'extra-bold',
      descriptionSize: 'medium',
      descriptionWeight: 'bold',
      ctaSize: 'large',
      ctaWeight: 'extra-bold'
    }
  }
];

// Helper function to get CSS values for typography
export function getTypographyCSS(settings: TypographySettings) {
  return {
    header: {
      fontSize: `${TYPOGRAPHY_SIZES[settings.headerSize].px}px`,
      fontWeight: TYPOGRAPHY_WEIGHTS[settings.headerWeight].value
    },
    price: {
      fontSize: `${TYPOGRAPHY_SIZES[settings.priceSize].px}px`,
      fontWeight: TYPOGRAPHY_WEIGHTS[settings.priceWeight].value
    },
    description: {
      fontSize: `${TYPOGRAPHY_SIZES[settings.descriptionSize].px}px`,
      fontWeight: TYPOGRAPHY_WEIGHTS[settings.descriptionWeight].value
    },
    cta: {
      fontSize: `${TYPOGRAPHY_SIZES[settings.ctaSize].px}px`,
      fontWeight: TYPOGRAPHY_WEIGHTS[settings.ctaWeight].value
    }
  };
}

// Phase 3: Default values and helpers

// Default disclaimer settings
export const DEFAULT_DISCLAIMER_SETTINGS: DisclaimerSettings = {
  displayMode: 'auto',
  showToggle: true,
  autoGenerateSummary: true
};

// Default download options
export const DEFAULT_DOWNLOAD_OPTIONS: DownloadOptions = {
  format: 'html',
  includeInlineCSS: true,
  includeTimestamp: true
};

// Helper function to create placeholder vehicle image
export function createPlaceholderImage(): VehicleImage {
  return {
    id: Math.random().toString(36).substr(2, 9),
    filename: 'placeholder.jpg',
    altText: 'Vehicle image placeholder',
    isPlaceholder: true
  };
}

// Dealer information examples for guidance
export const DEALER_INFO_EXAMPLES = {
  name: [
    'ABC Toyota of Downtown',
    'Premium Honda Center',
    'Metro Ford Dealership',
    'Elite Luxury Motors'
  ],
  location: [
    'Los Angeles, CA',
    'Downtown Chicago, IL',
    'Miami Beach, FL',
    'Austin, TX'
  ],
  phone: [
    '(555) 123-4567',
    '1-800-CAR-DEAL',
    '(888) 555-0123'
  ],
  website: [
    'www.abctoyota.com',
    'premiumhonda.com',
    'metroford.net'
  ]
};

// Helper function to validate offer completeness for download
export function validateOfferForDownload(offer: OfferData): { isValid: boolean; missingFields: string[] } {
  const missingFields: string[] = [];
  
  if (!offer.modelYear?.trim()) missingFields.push('Model Year');
  if (!offer.make?.trim()) missingFields.push('Make');
  if (!offer.model?.trim()) missingFields.push('Model');
  if (!offer.price?.trim() && !offer.apr?.trim()) missingFields.push('Price or APR');
  if (!offer.fullDisclaimer?.trim()) missingFields.push('Full Disclaimer');
  if (!offer.ctaButtons?.some(cta => cta.link?.trim())) missingFields.push('CTA Button Link');
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}


