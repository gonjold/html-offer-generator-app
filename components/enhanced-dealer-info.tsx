
'use client';

import { useState } from 'react';
import { DealerInformation, DEALER_INFO_EXAMPLES } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Phone, Globe, Clock, Zap, HelpCircle, Star } from 'lucide-react';

interface EnhancedDealerInfoProps {
  dealerName: string;
  dealerLocation: string;
  onDealerNameChange: (name: string) => void;
  onDealerLocationChange: (location: string) => void;
}

export function EnhancedDealerInfo({
  dealerName,
  dealerLocation,
  onDealerNameChange,
  onDealerLocationChange
}: EnhancedDealerInfoProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const quickFillName = (name: string) => {
    onDealerNameChange(name);
  };

  const quickFillLocation = (location: string) => {
    onDealerLocationChange(location);
  };

  return (
    <Card className="border-green-200 bg-green-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <span className="p-1 bg-green-100 rounded">
            <MapPin className="h-3 w-3 text-green-600" />
          </span>
          Enhanced Dealer Information
          <Badge variant="secondary" className="text-xs">Phase 3</Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-3 w-3 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-48">
                  Dealer information appears in the footer area below CTA buttons. 
                  This helps establish trust and provides contact details.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Placement Information */}
        <Alert className="border-green-200 bg-green-50">
          <Star className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 text-sm">
            <strong>Best Practice:</strong> Dealer information appears in the footer below CTA buttons, 
            providing credibility and contact details without cluttering the main offer.
          </AlertDescription>
        </Alert>

        {/* Basic Dealer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dealerName" className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              Dealer Name
            </Label>
            <div className="flex gap-2">
              <Input
                id="dealerName"
                placeholder="e.g., ABC Toyota of Downtown"
                value={dealerName}
                onChange={(e) => onDealerNameChange(e.target.value)}
                className="flex-1"
              />
              <Select onValueChange={quickFillName}>
                <SelectTrigger className="w-20">
                  <Zap className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  {DEALER_INFO_EXAMPLES.name.map((name, index) => (
                    <SelectItem key={index} value={name}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-xs text-gray-500">
              Full dealership name with location reference
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dealerLocation" className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              Location
            </Label>
            <div className="flex gap-2">
              <Input
                id="dealerLocation"
                placeholder="e.g., Los Angeles, CA"
                value={dealerLocation}
                onChange={(e) => onDealerLocationChange(e.target.value)}
                className="flex-1"
              />
              <Select onValueChange={quickFillLocation}>
                <SelectTrigger className="w-20">
                  <Zap className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  {DEALER_INFO_EXAMPLES.location.map((location, index) => (
                    <SelectItem key={index} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-xs text-gray-500">
              City and state for local recognition
            </div>
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-green-200">
          <Label className="text-sm font-medium">Additional Contact Information</Label>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-xs text-green-600 hover:text-green-800"
          >
            <Star className="h-3 w-3" />
            {showAdvanced ? 'Hide' : 'Show'} advanced options
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-4 p-3 bg-white border border-green-200 rounded-lg">
            <div className="text-xs font-medium text-green-800 mb-2">
              Future Enhancements (Phase 4):
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs">
                  <Phone className="h-3 w-3" />
                  Phone Number
                </Label>
                <Input placeholder="(555) 123-4567" disabled className="text-xs" />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs">
                  <Globe className="h-3 w-3" />
                  Website
                </Label>
                <Input placeholder="www.dealership.com" disabled className="text-xs" />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs">
                  <Clock className="h-3 w-3" />
                  Hours
                </Label>
                <Input placeholder="Mon-Sat 9AM-8PM" disabled className="text-xs" />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs">
                  <MapPin className="h-3 w-3" />
                  Full Address
                </Label>
                <Input placeholder="123 Main St, City, ST" disabled className="text-xs" />
              </div>
            </div>
          </div>
        )}

        {/* Examples Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-green-200">
          <Label className="text-sm font-medium">Dealer Name Examples</Label>
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="flex items-center gap-2 text-xs text-green-600 hover:text-green-800"
          >
            <HelpCircle className="h-3 w-3" />
            {showExamples ? 'Hide' : 'Show'} examples
          </button>
        </div>

        {/* Examples */}
        {showExamples && (
          <div className="p-3 bg-white border border-green-200 rounded-lg">
            <div className="text-xs font-medium text-green-800 mb-2">Example Dealer Names:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-green-700">
              <div>
                <div className="font-medium">Toyota Dealers:</div>
                <ul className="mt-1 space-y-0.5">
                  <li>• Downtown Toyota Center</li>
                  <li>• Metro Toyota of [City]</li>
                  <li>• [City] Toyota Dealership</li>
                </ul>
              </div>
              <div>
                <div className="font-medium">Luxury Dealers:</div>
                <ul className="mt-1 space-y-0.5">
                  <li>• Premium BMW of [Area]</li>
                  <li>• Elite Mercedes-Benz</li>
                  <li>• [City] Luxury Motors</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-3 text-xs font-medium text-green-800 mb-2">Best Practices:</div>
            <ul className="space-y-1 text-xs text-green-700">
              <li>• Include brand name for recognition</li>
              <li>• Add location reference for local appeal</li>
              <li>• Use official dealership name</li>
              <li>• Keep location concise (City, State)</li>
            </ul>
          </div>
        )}

        {/* Preview */}
        {(dealerName || dealerLocation) && (
          <div className="p-3 bg-gray-50 border rounded-lg">
            <div className="text-xs font-medium text-gray-600 mb-2">Footer Preview:</div>
            <div className="text-xs text-gray-800">
              {dealerName && <div className="font-medium">{dealerName}</div>}
              {dealerLocation && <div className="text-gray-600">{dealerLocation}</div>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
