
'use client';

import { useState, useEffect } from 'react';
import { OfferData, CTAButton, QUICK_FILL_DATA, LAYOUT_TEMPLATES, getBrandVariationByMake, getColorDropdownOptions, TEMPLATE_VARIATIONS, CustomColors, DEFAULT_TYPOGRAPHY, DEFAULT_DISCLAIMER_SETTINGS } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TypographyControls } from '@/components/typography-controls';
import { DisclaimerControls } from '@/components/disclaimer-controls';
import { ImageUploadPlaceholder } from '@/components/image-upload-placeholder';
import { EnhancedDealerInfo } from '@/components/enhanced-dealer-info';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Trash2, Copy, Plus, Zap, Layout, Palette, Eye, Type, ExternalLink, Info } from 'lucide-react';

interface OfferFormProps {
  offer: OfferData;
  onUpdate: (offer: OfferData) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  index: number;
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Color Preview Component
function ColorPreview({ variation }: { variation: any }) {
  if (!variation) return null;
  
  return (
    <div className="flex items-center gap-2 ml-2">
      <div
        className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
        style={{ backgroundColor: variation.primaryColor }}
      />
      <div
        className="w-3 h-3 rounded-full border border-gray-300 shadow-sm"
        style={{ backgroundColor: variation.secondaryColor }}
      />
    </div>
  );
}

// CTA Button Preview Component
function CTAButtonPreview({ cta, colors }: { cta: CTAButton; colors: { cta: string } }) {
  const sizeClasses = {
    small: 'px-3 py-1 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  };
  
  const styleClasses = {
    rounded: 'rounded-full',
    square: 'rounded-md'
  };

  return (
    <div className="inline-block">
      <button
        className={`text-white font-semibold transition-all ${sizeClasses[cta.size]} ${styleClasses[cta.style]}`}
        style={{ backgroundColor: colors.cta }}
        disabled
      >
        {cta.text || 'BUTTON TEXT'} →
      </button>
    </div>
  );
}

// Auto-generate disclaimer summary helper
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
  
  const vehicleDescription = [yearText, makeText, modelText].filter(text => 
    text !== 'YEAR' && text !== 'MAKE' && text !== 'MODEL'
  ).join(' ') || `${yearText} ${makeText} ${modelText}`;
  
  if (expirationDate) {
    return `Available on select new ${vehicleDescription} models. Expires ${expirationDate}.`;
  } else {
    return `Available on select new ${vehicleDescription} models.`;
  }
}

export function OfferForm({ offer, onUpdate, onDelete, onDuplicate, index }: OfferFormProps) {
  const [formData, setFormData] = useState<OfferData>(offer);
  const colorOptions = getColorDropdownOptions();

  // Ensure required settings exist
  useEffect(() => {
    const updates: Partial<OfferData> = {};
    
    if (!formData.typography) {
      updates.typography = DEFAULT_TYPOGRAPHY;
    }
    
    if (!formData.disclaimerSettings) {
      updates.disclaimerSettings = DEFAULT_DISCLAIMER_SETTINGS;
    }
    
    if (Object.keys(updates).length > 0) {
      const updatedOffer = { ...formData, ...updates };
      setFormData(updatedOffer);
      onUpdate(updatedOffer);
    }
  }, []);

  // Smart color selection based on make
  useEffect(() => {
    if (formData.make && formData.selectedVariation === 'default') {
      const brandVariation = getBrandVariationByMake(formData.make);
      if (brandVariation) {
        const updatedOffer = { 
          ...formData, 
          selectedVariation: brandVariation.id 
        };
        setFormData(updatedOffer);
        onUpdate(updatedOffer);
      }
    }
  }, [formData.make]);

  const handleChange = (field: keyof OfferData, value: any) => {
    const updatedOffer = { ...formData, [field]: value };
    
    // Handle make change - auto-select brand color if using default
    if (field === 'make' && (formData.selectedVariation === 'default' || formData.selectedVariation === 'classic')) {
      const brandVariation = getBrandVariationByMake(value);
      if (brandVariation) {
        updatedOffer.selectedVariation = brandVariation.id;
      } else {
        updatedOffer.selectedVariation = 'classic';
      }
    }
    
    setFormData(updatedOffer);
    onUpdate(updatedOffer);
  };

  const handleCTAChange = (ctaIndex: number, field: keyof CTAButton, value: string) => {
    const updatedCTAs = [...formData.ctaButtons];
    updatedCTAs[ctaIndex] = { ...updatedCTAs[ctaIndex], [field]: value };
    handleChange('ctaButtons', updatedCTAs);
  };

  const addCTA = () => {
    const newCTA: CTAButton = {
      id: generateId(),
      text: 'SHOP NOW',
      link: '',
      style: 'rounded',
      size: 'medium'
    };
    handleChange('ctaButtons', [...formData.ctaButtons, newCTA]);
  };

  const removeCTA = (ctaIndex: number) => {
    if (formData.ctaButtons.length > 1) {
      const updatedCTAs = formData.ctaButtons.filter((_, index) => index !== ctaIndex);
      handleChange('ctaButtons', updatedCTAs);
    }
  };

  const quickFill = (field: keyof OfferData, value: string) => {
    handleChange(field, value);
  };

  const handleColorSelection = (value: string) => {
    if (value === 'default') {
      // If make is set, use brand color, otherwise classic
      const brandVariation = getBrandVariationByMake(formData.make);
      const selectedVariation = brandVariation ? brandVariation.id : 'classic';
      handleChange('selectedVariation', selectedVariation);
    } else {
      handleChange('selectedVariation', value);
    }
  };

  const handleCustomColorsChange = (colors: CustomColors) => {
    handleChange('customColors', colors);
  };

  const handleTypographyChange = (typography: any) => {
    handleChange('typography', typography);
  };

  const handleDisclaimerSettingsChange = (settings: any) => {
    handleChange('disclaimerSettings', settings);
  };

  const handleImageChange = (image: any) => {
    handleChange('vehicleImage', image);
  };

  const handleClear = () => {
    const clearedOffer: OfferData = {
      id: offer.id,
      modelYear: '',
      make: '',
      model: '',
      price: '',
      apr: '',
      aprCash: '',
      ctaLink: '',
      fullDisclaimer: '',
      
      // Layout Template Selection
      layoutTemplate: 'adaptive-auto',
      
      // Color Theme Selection
      selectedVariation: 'classic',
      customColors: {
        vehicleTitle: '#EB0A1E',
        offers: '#EB0A1E',
        cta: '#EB0A1E'
      },
      
      // Typography Settings
      typography: DEFAULT_TYPOGRAPHY,
      
      // Phase 3: Disclaimer Settings
      disclaimerSettings: DEFAULT_DISCLAIMER_SETTINGS,
      
      ctaButtons: [{
        id: generateId(),
        text: 'SHOP NOW',
        link: '',
        style: 'rounded',
        size: 'medium'
      }],
      headerText: 'NEW {YEAR} {MAKE} {MODEL} MODELS',
      promotionalBadge: '',
      footerText: '',
      dealerName: '',
      dealerLocation: '',
      perMonthText: 'per month',
      orText: 'OR',
      aprAvailableText: 'APR Available'
    };
    setFormData(clearedOffer);
    onUpdate(clearedOffer);
  };

  // Get current color variation for preview
  const currentVariation = TEMPLATE_VARIATIONS.find(v => v.id === formData.selectedVariation);
  const displayVariation = formData.selectedVariation === 'default' 
    ? getBrandVariationByMake(formData.make) || TEMPLATE_VARIATIONS.find(v => v.id === 'classic')
    : currentVariation;

  // Get colors for CTA preview
  const colors = formData.selectedVariation === 'custom' && formData.customColors ? {
    cta: formData.customColors.cta
  } : {
    cta: displayVariation?.primaryColor || '#EB0A1E'
  };

  return (
    <div className="space-y-8">
      {/* Basic Vehicle Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <span className="p-1 bg-blue-100 rounded">
            <Info className="h-3 w-3 text-blue-600" />
          </span>
          Vehicle Information
          <Badge variant="secondary" className="text-xs">Required</Badge>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label htmlFor={`modelYear-${offer.id}`}>Model Year *</Label>
            <div className="flex gap-2">
              <Input
                id={`modelYear-${offer.id}`}
                placeholder="e.g., 2025"
                value={formData.modelYear}
                onChange={(e) => handleChange('modelYear', e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-1">
                {QUICK_FILL_DATA.modelYears.map((year) => (
                  <Button
                    key={year}
                    variant="outline"
                    size="sm"
                    onClick={() => quickFill('modelYear', year)}
                    className="text-xs px-2"
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Label htmlFor={`make-${offer.id}`}>Make *</Label>
            <div className="flex gap-2">
              <Input
                id={`make-${offer.id}`}
                placeholder="e.g., Toyota"
                value={formData.make}
                onChange={(e) => handleChange('make', e.target.value)}
                className="flex-1"
              />
              <Select onValueChange={(value) => quickFill('make', value)}>
                <SelectTrigger className="w-20">
                  <Zap className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  {QUICK_FILL_DATA.popularMakes.map((make) => (
                    <SelectItem key={make} value={make}>{make}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-3">
            <Label htmlFor={`model-${offer.id}`}>Model *</Label>
            <Input
              id={`model-${offer.id}`}
              placeholder="e.g., Camry"
              value={formData.model}
              onChange={(e) => handleChange('model', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Layout Template & Colors Combined */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <span className="p-1 bg-purple-100 rounded">
            <Layout className="h-3 w-3 text-purple-600" />
          </span>
          Layout & Styling
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Layout Template */}
          <div className="space-y-3">
            <Label htmlFor={`layoutTemplate-${offer.id}`}>Layout Template</Label>
            <Select 
              value={formData.layoutTemplate || 'adaptive-auto'} 
              onValueChange={(value) => handleChange('layoutTemplate', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select layout template" />
              </SelectTrigger>
              <SelectContent>
                {LAYOUT_TEMPLATES.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{template.name}</span>
                      <span className="text-xs text-gray-500">{template.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-xs text-gray-500 mt-2">
              {LAYOUT_TEMPLATES.find(t => t.id === (formData.layoutTemplate || 'adaptive-auto'))?.preview}
            </div>
          </div>

          {/* Color Theme */}
          <div className="space-y-3">
            <Label htmlFor={`colorTheme-${offer.id}`}>Color Theme</Label>
            <div className="flex items-center gap-3">
              <Select 
                value={formData.selectedVariation || 'default'} 
                onValueChange={handleColorSelection}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select color theme" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <span>{option.label}</span>
                        <ColorPreview variation={option.variation} />
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {displayVariation && (
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded border">
                  <Eye className="h-3 w-3 text-gray-400" />
                  <ColorPreview variation={displayVariation} />
                  <span className="text-xs text-gray-600">{displayVariation.name}</span>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {formData.selectedVariation === 'default' 
                ? 'Automatically selects brand colors based on selected make'
                : displayVariation?.description
              }
            </div>
          </div>
        </div>
      </div>

      {/* Custom Colors Section */}
      {formData.selectedVariation === 'custom' && (
        <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
          <h4 className="font-medium text-sm">Custom Color Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`vehicleTitle-${offer.id}`}>Vehicle Title Color</Label>
              <div className="flex gap-2">
                <Input
                  id={`vehicleTitle-${offer.id}`}
                  type="color"
                  value={formData.customColors?.vehicleTitle || '#EB0A1E'}
                  onChange={(e) => handleCustomColorsChange({
                    ...formData.customColors,
                    vehicleTitle: e.target.value,
                    offers: formData.customColors?.offers || '#EB0A1E',
                    cta: formData.customColors?.cta || '#EB0A1E'
                  })}
                  className="w-12 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={formData.customColors?.vehicleTitle || '#EB0A1E'}
                  onChange={(e) => handleCustomColorsChange({
                    ...formData.customColors,
                    vehicleTitle: e.target.value,
                    offers: formData.customColors?.offers || '#EB0A1E',
                    cta: formData.customColors?.cta || '#EB0A1E'
                  })}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`offers-${offer.id}`}>Offer Prices Color</Label>
              <div className="flex gap-2">
                <Input
                  id={`offers-${offer.id}`}
                  type="color"
                  value={formData.customColors?.offers || '#EB0A1E'}
                  onChange={(e) => handleCustomColorsChange({
                    ...formData.customColors,
                    vehicleTitle: formData.customColors?.vehicleTitle || '#EB0A1E',
                    offers: e.target.value,
                    cta: formData.customColors?.cta || '#EB0A1E'
                  })}
                  className="w-12 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={formData.customColors?.offers || '#EB0A1E'}
                  onChange={(e) => handleCustomColorsChange({
                    ...formData.customColors,
                    vehicleTitle: formData.customColors?.vehicleTitle || '#EB0A1E',
                    offers: e.target.value,
                    cta: formData.customColors?.cta || '#EB0A1E'
                  })}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`cta-${offer.id}`}>CTA Button Color</Label>
              <div className="flex gap-2">
                <Input
                  id={`cta-${offer.id}`}
                  type="color"
                  value={formData.customColors?.cta || '#EB0A1E'}
                  onChange={(e) => handleCustomColorsChange({
                    ...formData.customColors,
                    vehicleTitle: formData.customColors?.vehicleTitle || '#EB0A1E',
                    offers: formData.customColors?.offers || '#EB0A1E',
                    cta: e.target.value
                  })}
                  className="w-12 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={formData.customColors?.cta || '#EB0A1E'}
                  onChange={(e) => handleCustomColorsChange({
                    ...formData.customColors,
                    vehicleTitle: formData.customColors?.vehicleTitle || '#EB0A1E',
                    offers: formData.customColors?.offers || '#EB0A1E',
                    cta: e.target.value
                  })}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Separator />

      {/* Typography Controls */}
      {formData.typography && (
        <TypographyControls
          settings={formData.typography}
          onSettingsChange={handleTypographyChange}
        />
      )}

      <Separator />

      {/* Pricing Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Pricing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor={`price-${offer.id}`}>Price/Payment (Optional)</Label>
            <Input
              id={`price-${offer.id}`}
              placeholder="e.g., $269"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor={`apr-${offer.id}`}>Rate/APR (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id={`apr-${offer.id}`}
                placeholder="e.g., 2.99%"
                value={formData.apr}
                onChange={(e) => handleChange('apr', e.target.value)}
                className="flex-1"
              />
              <Select onValueChange={(value) => quickFill('apr', value)}>
                <SelectTrigger className="w-20">
                  <Zap className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  {QUICK_FILL_DATA.standardAPRs.map((apr) => (
                    <SelectItem key={apr} value={apr}>{apr}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor={`aprCash-${offer.id}`}>Bonus Cash or other offer (Optional)</Label>
          <div className="flex gap-2">
            <Input
              id={`aprCash-${offer.id}`}
              placeholder="e.g., PLUS $500 CASH BACK"
              value={formData.aprCash}
              onChange={(e) => handleChange('aprCash', e.target.value)}
              className="flex-1"
            />
            <Select onValueChange={(value) => quickFill('aprCash', value)}>
              <SelectTrigger className="w-20">
                <Zap className="h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                {QUICK_FILL_DATA.commonBonusAmounts.map((bonus) => (
                  <SelectItem key={bonus} value={bonus}>{bonus}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Enhanced CTA Customization */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
            <span className="p-1 bg-orange-100 rounded">
              <ExternalLink className="h-3 w-3 text-orange-600" />
            </span>
            Call-to-Action Buttons
            <Badge variant="secondary" className="text-xs">{formData.ctaButtons.length}</Badge>
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={addCTA}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add CTA
          </Button>
        </div>

        <div className="space-y-4">
          {formData.ctaButtons.map((cta, ctaIndex) => (
            <div key={cta.id} className="border rounded-lg p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">CTA Button #{ctaIndex + 1}</h4>
                <div className="flex items-center gap-2">
                  <CTAButtonPreview cta={cta} colors={colors} />
                  {formData.ctaButtons.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCTA(ctaIndex)}
                      className="h-8 w-8 p-0 text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    placeholder="e.g., SHOP NOW"
                    value={cta.text}
                    onChange={(e) => handleCTAChange(ctaIndex, 'text', e.target.value)}
                    maxLength={20}
                  />
                  <div className="text-xs text-gray-500">
                    {cta.text.length}/20 characters
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Button Link *</Label>
                  <Input
                    placeholder="https://example.com/inventory"
                    value={cta.link}
                    onChange={(e) => handleCTAChange(ctaIndex, 'link', e.target.value)}
                  />
                  <div className="text-xs text-gray-500">
                    Required for export
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Button Style</Label>
                  <Select value={cta.style} onValueChange={(value: 'rounded' | 'square') => handleCTAChange(ctaIndex, 'style', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rounded">Rounded Corners</SelectItem>
                      <SelectItem value="square">Square Corners</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Button Size</Label>
                  <Select value={cta.size} onValueChange={(value: 'small' | 'medium' | 'large') => handleCTAChange(ctaIndex, 'size', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Phase 3: Enhanced Dealer Information */}
      <EnhancedDealerInfo
        dealerName={formData.dealerName}
        dealerLocation={formData.dealerLocation}
        onDealerNameChange={(name) => handleChange('dealerName', name)}
        onDealerLocationChange={(location) => handleChange('dealerLocation', location)}
      />

      <Separator />

      {/* Advanced Customizations */}
      <Accordion type="multiple" className="w-full">
        {/* Verbiage Customization */}
        <AccordionItem value="verbiage">
          <AccordionTrigger>Text & Verbiage Customization</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`headerText-${offer.id}`}>Header Text</Label>
              <Input
                id={`headerText-${offer.id}`}
                placeholder="NEW {YEAR} {MAKE} {MODEL} MODELS"
                value={formData.headerText}
                onChange={(e) => handleChange('headerText', e.target.value)}
              />
              <p className="text-xs text-gray-500">Use {`{YEAR}`}, {`{MAKE}`}, and {`{MODEL}`} as placeholders</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`promotionalBadge-${offer.id}`}>Promotional Badge/Ribbon</Label>
              <Input
                id={`promotionalBadge-${offer.id}`}
                placeholder="e.g., LIMITED TIME OFFER"
                value={formData.promotionalBadge}
                onChange={(e) => handleChange('promotionalBadge', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`perMonthText-${offer.id}`}>"Per Month" Text</Label>
                <Input
                  id={`perMonthText-${offer.id}`}
                  placeholder="per month"
                  value={formData.perMonthText}
                  onChange={(e) => handleChange('perMonthText', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`orText-${offer.id}`}>"OR" Text</Label>
                <Input
                  id={`orText-${offer.id}`}
                  placeholder="OR"
                  value={formData.orText}
                  onChange={(e) => handleChange('orText', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`aprAvailableText-${offer.id}`}>"APR Available" Text</Label>
                <Input
                  id={`aprAvailableText-${offer.id}`}
                  placeholder="APR Available"
                  value={formData.aprAvailableText}
                  onChange={(e) => handleChange('aprAvailableText', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`footerText-${offer.id}`}>Footer Text</Label>
              <Input
                id={`footerText-${offer.id}`}
                placeholder="e.g., Visit us today for the best deals!"
                value={formData.footerText}
                onChange={(e) => handleChange('footerText', e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Phase 3: Image Upload Placeholder */}
        <AccordionItem value="image-upload">
          <AccordionTrigger>Vehicle Image Upload (Beta)</AccordionTrigger>
          <AccordionContent>
            <ImageUploadPlaceholder
              vehicleImage={formData.vehicleImage}
              onImageChange={handleImageChange}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator />

      {/* Phase 3: Enhanced Disclaimer Management */}
      {formData.disclaimerSettings && (
        <DisclaimerControls
          settings={formData.disclaimerSettings}
          fullDisclaimer={formData.fullDisclaimer}
          onSettingsChange={handleDisclaimerSettingsChange}
          autoGeneratedSummary={generateDisclaimerSummary(formData)}
        />
      )}

      {/* Legacy CTA Link (for backward compatibility) */}
      <div className="space-y-3">
        <Label htmlFor={`ctaLink-${offer.id}`}>Legacy CTA Link (Optional)</Label>
        <Input
          id={`ctaLink-${offer.id}`}
          placeholder="https://example.com/inventory"
          value={formData.ctaLink}
          onChange={(e) => handleChange('ctaLink', e.target.value)}
        />
        <p className="text-xs text-gray-500">This field is kept for backward compatibility. Use CTA Button customization above for better control.</p>
      </div>

      {/* Disclaimer */}
      <div className="space-y-3">
        <Label htmlFor={`disclaimer-${offer.id}`}>Full Disclaimer *</Label>
        <Textarea
          id={`disclaimer-${offer.id}`}
          placeholder="Enter the complete legal disclaimer text..."
          value={formData.fullDisclaimer}
          onChange={(e) => handleChange('fullDisclaimer', e.target.value)}
          rows={4}
        />
        <div className="text-xs text-gray-500">
          {formData.fullDisclaimer.length} characters | Required for export
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button variant="outline" onClick={handleClear} size="sm">
          Clear Form
        </Button>
      </div>
    </div>
  );
}
