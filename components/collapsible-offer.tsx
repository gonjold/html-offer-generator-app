
'use client';

import { useState } from 'react';
import { OfferData } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OfferForm } from './offer-form';
import { 
  ChevronDown, 
  ChevronRight, 
  Car, 
  Copy, 
  Trash2, 
  Edit3,
  DollarSign,
  Calendar,
  Building
} from 'lucide-react';

interface CollapsibleOfferProps {
  offer: OfferData;
  index: number;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onUpdate: (offer: OfferData) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export function CollapsibleOffer({
  offer,
  index,
  isExpanded,
  onToggleExpanded,
  onUpdate,
  onDelete,
  onDuplicate
}: CollapsibleOfferProps) {
  
  // Generate offer summary for collapsed state
  const getOfferSummary = () => {
    const parts = [];
    
    if (offer.modelYear) parts.push(offer.modelYear);
    if (offer.make) parts.push(offer.make);
    if (offer.model) parts.push(offer.model);
    
    if (parts.length === 0) {
      return `Offer #${index + 1}`;
    }
    
    let summary = parts.join(' ');
    
    if (offer.price) {
      summary += ` - ${offer.price}`;
      if (offer.perMonthText && offer.perMonthText !== 'per month') {
        summary += ` ${offer.perMonthText}`;
      } else {
        summary += '/month';
      }
    } else if (offer.apr) {
      summary += ` - ${offer.apr} APR`;
    }
    
    return summary;
  };

  const getCompletionStatus = () => {
    const requiredFields = [
      offer.modelYear,
      offer.make,
      offer.model,
      (offer.price || offer.apr),
      offer.fullDisclaimer,
      offer.ctaButtons?.some(cta => cta.link)
    ];
    
    const filledFields = requiredFields.filter(Boolean).length;
    const totalFields = requiredFields.length;
    
    return {
      percentage: Math.round((filledFields / totalFields) * 100),
      complete: filledFields === totalFields
    };
  };

  const status = getCompletionStatus();
  const summary = getOfferSummary();

  return (
    <Card className={`w-full transition-all duration-300 ${isExpanded ? 'shadow-lg border-blue-200' : 'shadow-sm hover:shadow-md'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onToggleExpanded}
            className="flex items-center gap-3 text-left flex-1 hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
              <div className="p-2 bg-blue-100 rounded-lg">
                <Car className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm text-gray-900 truncate">
                  {summary}
                </h3>
                {status.complete ? (
                  <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                    Complete
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    {status.percentage}% Complete
                  </Badge>
                )}
              </div>
              
              {!isExpanded && (
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {offer.modelYear && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {offer.modelYear}
                    </div>
                  )}
                  {offer.price && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {offer.price}
                    </div>
                  )}
                  {offer.dealerName && (
                    <div className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {offer.dealerName}
                    </div>
                  )}
                </div>
              )}
            </div>
          </button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDuplicate}
              className="h-8 w-8 p-0"
              title="Duplicate offer"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpanded}
              className="h-8 w-8 p-0"
              title={isExpanded ? "Collapse" : "Edit offer"}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
              title="Delete offer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <OfferForm
            offer={offer}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            index={index}
          />
        </CardContent>
      )}
    </Card>
  );
}
