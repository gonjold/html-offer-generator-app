
'use client';

import { TEMPLATE_VARIATIONS, BRAND_COLORS, SEASONAL_COLORS, TemplateVariation, CustomColors } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface TemplateSelectorProps {
  selectedVariation: string;
  onVariationChange: (variationId: string) => void;
  customColors?: CustomColors;
  onCustomColorsChange?: (colors: CustomColors) => void;
}

function ColorVariationGrid({ variations, title, selectedVariation, onVariationChange }: {
  variations: TemplateVariation[];
  title: string;
  selectedVariation: string;
  onVariationChange: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h4 className="font-medium text-sm text-gray-700">{title}</h4>
        <Badge variant="outline" className="text-xs">{variations.length}</Badge>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {variations.map((variation) => (
          <div
            key={variation.id}
            className={`
              p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md
              ${selectedVariation === variation.id 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => onVariationChange(variation.id)}
          >
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={variation.id} id={variation.id} className="sr-only" />
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: variation.primaryColor }}
              />
              <div
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: variation.secondaryColor }}
              />
            </div>
            <Label
              htmlFor={variation.id}
              className="cursor-pointer block"
            >
              <span className="font-medium text-sm">{variation.name}</span>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{variation.description}</p>
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TemplateSelector({ 
  selectedVariation, 
  onVariationChange, 
  customColors,
  onCustomColorsChange 
}: TemplateSelectorProps) {
  // Classic for backward compatibility
  const classicVariation = TEMPLATE_VARIATIONS.find(v => v.id === 'classic');
  const customVariation = TEMPLATE_VARIATIONS.find(v => v.id === 'custom');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          Color & Brand Themes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selectedVariation}
          onValueChange={onVariationChange}
          className="space-y-6"
        >
          {/* Classic Option */}
          {classicVariation && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-700">Default</h4>
              <div
                className={`
                  p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md
                  ${selectedVariation === 'classic' 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => onVariationChange('classic')}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="classic" id="classic" className="sr-only" />
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: classicVariation.primaryColor }}
                  />
                  <div
                    className="w-3 h-3 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: classicVariation.secondaryColor }}
                  />
                </div>
                <Label htmlFor="classic" className="cursor-pointer block">
                  <span className="font-medium text-sm">{classicVariation.name}</span>
                  <p className="text-xs text-gray-500 mt-1">{classicVariation.description}</p>
                </Label>
              </div>
            </div>
          )}

          <Separator />

          {/* Automotive Brand Colors */}
          <ColorVariationGrid
            variations={BRAND_COLORS}
            title="Automotive Brands"
            selectedVariation={selectedVariation}
            onVariationChange={onVariationChange}
          />

          <Separator />

          {/* Seasonal Colors */}
          <ColorVariationGrid
            variations={SEASONAL_COLORS}
            title="Seasonal Themes"
            selectedVariation={selectedVariation}
            onVariationChange={onVariationChange}
          />

          <Separator />

          {/* Custom Colors */}
          {customVariation && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-700">Custom Colors</h4>
              <div
                className={`
                  p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md
                  ${selectedVariation === 'custom' 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => onVariationChange('custom')}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="custom" id="custom" className="sr-only" />
                  <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm bg-gradient-to-r from-red-500 to-blue-500" />
                  <div className="w-3 h-3 rounded-full border border-white shadow-sm bg-gray-400" />
                </div>
                <Label htmlFor="custom" className="cursor-pointer block">
                  <span className="font-medium text-sm">{customVariation.name}</span>
                  <p className="text-xs text-gray-500 mt-1">{customVariation.description}</p>
                </Label>
              </div>
            </div>
          )}
        </RadioGroup>
        
        {selectedVariation === 'custom' && customColors && onCustomColorsChange && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-4">Custom Colors</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleTitle">Vehicle Title Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="vehicleTitle"
                      type="color"
                      value={customColors.vehicleTitle}
                      onChange={(e) => onCustomColorsChange({
                        ...customColors,
                        vehicleTitle: e.target.value
                      })}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={customColors.vehicleTitle}
                      onChange={(e) => onCustomColorsChange({
                        ...customColors,
                        vehicleTitle: e.target.value
                      })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="offers">Offer Prices Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="offers"
                      type="color"
                      value={customColors.offers}
                      onChange={(e) => onCustomColorsChange({
                        ...customColors,
                        offers: e.target.value
                      })}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={customColors.offers}
                      onChange={(e) => onCustomColorsChange({
                        ...customColors,
                        offers: e.target.value
                      })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cta">CTA Button Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="cta"
                      type="color"
                      value={customColors.cta}
                      onChange={(e) => onCustomColorsChange({
                        ...customColors,
                        cta: e.target.value
                      })}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={customColors.cta}
                      onChange={(e) => onCustomColorsChange({
                        ...customColors,
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
      </CardContent>
    </Card>
  );
}
