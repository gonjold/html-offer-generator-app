
'use client';

import { TypographySettings, TYPOGRAPHY_SIZES, TYPOGRAPHY_WEIGHTS, TYPOGRAPHY_PRESETS, DEFAULT_TYPOGRAPHY } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Type, RotateCcw, Zap } from 'lucide-react';

interface TypographyControlsProps {
  settings: TypographySettings;
  onSettingsChange: (settings: TypographySettings) => void;
}

export function TypographyControls({ settings, onSettingsChange }: TypographyControlsProps) {
  
  const handlePresetApply = (presetId: string) => {
    const preset = TYPOGRAPHY_PRESETS.find(p => p.id === presetId);
    if (preset) {
      onSettingsChange(preset.settings);
    }
  };

  const handleReset = () => {
    onSettingsChange(DEFAULT_TYPOGRAPHY);
  };

  const handleElementChange = (
    element: keyof TypographySettings,
    value: string
  ) => {
    onSettingsChange({
      ...settings,
      [element]: value
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-lg">Typography Controls</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Customize text sizes and weights for different elements. Changes will be reflected in the live preview.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Typography Presets */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            <Label className="text-sm font-medium">Quick Presets</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TYPOGRAPHY_PRESETS.map((preset) => (
              <Button
                key={preset.id}
                variant="outline"
                size="sm"
                onClick={() => handlePresetApply(preset.id)}
                className="h-auto p-3 text-left flex flex-col items-start"
              >
                <div className="font-medium text-sm mb-1">{preset.name}</div>
                <div className="text-xs text-gray-500">{preset.description}</div>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Individual Element Controls */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Label className="text-sm font-medium">Individual Element Controls</Label>
            <Badge variant="secondary" className="text-xs">4 Elements</Badge>
          </div>

          {/* Header Controls */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-blue-700">Header Text</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Size</Label>
                <Select
                  value={settings.headerSize}
                  onValueChange={(value: any) => handleElementChange('headerSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPOGRAPHY_SIZES).map(([key, size]) => (
                      <SelectItem key={key} value={key}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Weight</Label>
                <Select
                  value={settings.headerWeight}
                  onValueChange={(value: any) => handleElementChange('headerWeight', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPOGRAPHY_WEIGHTS).map(([key, weight]) => (
                      <SelectItem key={key} value={key}>
                        {weight.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Price Controls */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-green-700">Price Text</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Size</Label>
                <Select
                  value={settings.priceSize}
                  onValueChange={(value: any) => handleElementChange('priceSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPOGRAPHY_SIZES).map(([key, size]) => (
                      <SelectItem key={key} value={key}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Weight</Label>
                <Select
                  value={settings.priceWeight}
                  onValueChange={(value: any) => handleElementChange('priceWeight', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPOGRAPHY_WEIGHTS).map(([key, weight]) => (
                      <SelectItem key={key} value={key}>
                        {weight.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Description Controls */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-purple-700">Description Text</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Size</Label>
                <Select
                  value={settings.descriptionSize}
                  onValueChange={(value: any) => handleElementChange('descriptionSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPOGRAPHY_SIZES).map(([key, size]) => (
                      <SelectItem key={key} value={key}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Weight</Label>
                <Select
                  value={settings.descriptionWeight}
                  onValueChange={(value: any) => handleElementChange('descriptionWeight', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPOGRAPHY_WEIGHTS).map(([key, weight]) => (
                      <SelectItem key={key} value={key}>
                        {weight.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* CTA Controls */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-orange-700">CTA Button Text</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Size</Label>
                <Select
                  value={settings.ctaSize}
                  onValueChange={(value: any) => handleElementChange('ctaSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPOGRAPHY_SIZES).map(([key, size]) => (
                      <SelectItem key={key} value={key}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Weight</Label>
                <Select
                  value={settings.ctaWeight}
                  onValueChange={(value: any) => handleElementChange('ctaWeight', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPOGRAPHY_WEIGHTS).map(([key, weight]) => (
                      <SelectItem key={key} value={key}>
                        {weight.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Typography Preview */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <Label className="text-sm font-medium mb-3 block">Typography Preview</Label>
          <div className="space-y-3 bg-white p-4 rounded border">
            <div 
              style={{
                fontSize: `${TYPOGRAPHY_SIZES[settings.headerSize].px}px`,
                fontWeight: TYPOGRAPHY_WEIGHTS[settings.headerWeight].value
              }}
              className="text-blue-700"
            >
              NEW 2025 TOYOTA CAMRY MODELS
            </div>
            <div 
              style={{
                fontSize: `${TYPOGRAPHY_SIZES[settings.priceSize].px}px`,
                fontWeight: TYPOGRAPHY_WEIGHTS[settings.priceWeight].value
              }}
              className="text-green-600"
            >
              $299
            </div>
            <div 
              style={{
                fontSize: `${TYPOGRAPHY_SIZES[settings.descriptionSize].px}px`,
                fontWeight: TYPOGRAPHY_WEIGHTS[settings.descriptionWeight].value
              }}
              className="text-gray-600"
            >
              per month
            </div>
            <button 
              style={{
                fontSize: `${TYPOGRAPHY_SIZES[settings.ctaSize].px}px`,
                fontWeight: TYPOGRAPHY_WEIGHTS[settings.ctaWeight].value
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
