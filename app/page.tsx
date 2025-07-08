
'use client';

import { useState, useEffect } from 'react';
import { OfferData, CustomColors, UIPreferences, DEFAULT_TYPOGRAPHY, DEFAULT_DISCLAIMER_SETTINGS } from '@/lib/types';
import { generateMultipleOffersHTML } from '@/lib/template-generator';
import { CollapsibleOffer } from '@/components/collapsible-offer';
import { InstructionsPanel } from '@/components/instructions-panel';
import { OfferPreview } from '@/components/offer-preview';
import { GeneratedHtml } from '@/components/generated-html';
import { DownloadManager } from '@/components/download-manager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Download, Trash2, Car, Settings2, Eye, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function createEmptyOffer(): OfferData {
  return {
    id: generateId(),
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
    selectedVariation: 'default',
    customColors: {
      vehicleTitle: '#EB0A1E',
      offers: '#EB0A1E',
      cta: '#EB0A1E'
    },
    
    // Typography Settings
    typography: DEFAULT_TYPOGRAPHY,
    
    // Phase 3: Disclaimer Settings
    disclaimerSettings: DEFAULT_DISCLAIMER_SETTINGS,
    
    // CTA Customizations
    ctaButtons: [{
      id: generateId(),
      text: 'SHOP NOW',
      link: '',
      style: 'rounded',
      size: 'medium'
    }],
    
    // Verbiage Customizations
    headerText: 'NEW {YEAR} {MAKE} {MODEL} MODELS',
    promotionalBadge: '',
    footerText: '',
    dealerName: '',
    dealerLocation: '',
    
    // Editable Text Elements
    perMonthText: 'per month',
    orText: 'OR',
    aprAvailableText: 'APR Available'
  };
}

export default function HomePage() {
  const [offers, setOffers] = useState<OfferData[]>([createEmptyOffer()]);
  const [uiPreferences, setUIPreferences] = useState<UIPreferences>({
    instructionsExpanded: true,
    expertMode: false,
    collapsedOffers: []
  });
  const { toast } = useToast();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'n':
            e.preventDefault();
            addOffer();
            break;
          case 'e':
            e.preventDefault();
            exportAllOffers();
            break;
          case 'r':
            e.preventDefault();
            clearAllOffers();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [offers]);

  const addOffer = () => {
    const newOffer = createEmptyOffer();
    setOffers([...offers, newOffer]);
    // Expand the new offer by default
    setUIPreferences(prev => ({
      ...prev,
      collapsedOffers: prev.collapsedOffers.filter(id => id !== newOffer.id)
    }));
  };

  const updateOffer = (index: number, updatedOffer: OfferData) => {
    const newOffers = [...offers];
    newOffers[index] = updatedOffer;
    setOffers(newOffers);
  };

  const deleteOffer = (index: number) => {
    if (offers.length === 1) {
      toast({
        title: "Cannot delete",
        description: "At least one offer must remain",
        variant: "destructive",
      });
      return;
    }
    
    const deletedOffer = offers[index];
    const newOffers = offers.filter((_, i) => i !== index);
    setOffers(newOffers);
    
    // Remove from collapsed offers list
    setUIPreferences(prev => ({
      ...prev,
      collapsedOffers: prev.collapsedOffers.filter(id => id !== deletedOffer.id)
    }));
    
    toast({
      title: "Deleted",
      description: "Offer has been removed",
    });
  };

  const duplicateOffer = (index: number) => {
    const offerToDuplicate = offers[index];
    const duplicatedOffer = { ...offerToDuplicate, id: generateId() };
    setOffers([...offers, duplicatedOffer]);
    
    // Expand the duplicated offer by default
    setUIPreferences(prev => ({
      ...prev,
      collapsedOffers: prev.collapsedOffers.filter(id => id !== duplicatedOffer.id)
    }));
    
    toast({
      title: "Duplicated",
      description: "Offer has been copied",
    });
  };

  const clearAllOffers = () => {
    setOffers([createEmptyOffer()]);
    setUIPreferences(prev => ({
      ...prev,
      collapsedOffers: []
    }));
    toast({
      title: "Cleared",
      description: "All offers have been cleared",
    });
  };

  const exportAllOffers = () => {
    const validOffers = offers.filter(offer => 
      offer.modelYear && offer.make && offer.model && (offer.price || offer.apr) && 
      offer.ctaButtons.some(cta => cta.link) && offer.fullDisclaimer
    );
    
    if (validOffers.length === 0) {
      toast({
        title: "No valid offers",
        description: "Please complete at least one offer before exporting",
        variant: "destructive",
      });
      return;
    }
    
    // Get the variation and custom colors from the first valid offer
    const firstOffer = validOffers[0];
    const htmlContent = generateMultipleOffersHTML(
      validOffers, 
      firstOffer.selectedVariation || 'classic', 
      firstOffer.selectedVariation === 'custom' ? firstOffer.customColors : undefined
    );
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `automotive-offers-collection.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Exported!",
      description: `${validOffers.length} offers exported successfully`,
    });
  };

  const toggleOfferExpanded = (offerId: string) => {
    setUIPreferences(prev => ({
      ...prev,
      collapsedOffers: prev.collapsedOffers.includes(offerId)
        ? prev.collapsedOffers.filter(id => id !== offerId)
        : [...prev.collapsedOffers, offerId]
    }));
  };

  const isOfferExpanded = (offerId: string) => {
    return !uiPreferences.collapsedOffers.includes(offerId);
  };

  const currentOffer = offers[0]; // Use first offer for preview
  // Show preview with any field filled (more forgiving for partial data)
  const hasAnyData = currentOffer && (
    currentOffer.modelYear || 
    currentOffer.make || 
    currentOffer.model || 
    currentOffer.price || 
    currentOffer.apr || 
    currentOffer.aprCash || 
    currentOffer.ctaLink || 
    currentOffer.fullDisclaimer
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  HTML Automotive Offer Generator
                </h1>
                <p className="text-gray-600">
                  Create professional automotive offers with custom HTML templates - Phase 3 Enhanced Features
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={clearAllOffers}
                title="Clear All (Ctrl+R)"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <Button 
                onClick={exportAllOffers}
                title="Export All (Ctrl+E)"
              >
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructions Panel */}
        <InstructionsPanel
          expanded={uiPreferences.instructionsExpanded}
          onExpandedChange={(expanded) => 
            setUIPreferences(prev => ({ ...prev, instructionsExpanded: expanded }))
          }
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Offer Management */}
          <div className="space-y-6">
            {/* Offers Header */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-gray-600" />
                  <CardTitle>Offer Configuration</CardTitle>
                </div>
                <Button
                  onClick={addOffer}
                  size="sm"
                  title="Add Offer (Ctrl+N)"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Offer ({offers.length})
                </Button>
              </CardHeader>
            </Card>

            {/* Collapsible Offers */}
            <div className="space-y-4">
              {offers.map((offer, index) => (
                <CollapsibleOffer
                  key={offer.id}
                  offer={offer}
                  index={index}
                  isExpanded={isOfferExpanded(offer.id)}
                  onToggleExpanded={() => toggleOfferExpanded(offer.id)}
                  onUpdate={(updatedOffer) => updateOffer(index, updatedOffer)}
                  onDelete={() => deleteOffer(index)}
                  onDuplicate={() => duplicateOffer(index)}
                />
              ))}
            </div>

            {/* Add Offer Button at Bottom */}
            <Button
              onClick={addOffer}
              variant="outline"
              className="w-full h-12 border-dashed border-2 text-gray-600 hover:text-gray-800 hover:border-gray-400"
              title="Add Offer (Ctrl+N)"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Another Offer
            </Button>

            {/* Phase 3: Download Manager */}
            <DownloadManager offers={offers} />
          </div>

          {/* Right Column - Preview and Code */}
          <div className="space-y-6">
            {hasAnyData ? (
              <>
                {/* Preview and Code Tabs */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Live Preview & Export</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="preview" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="preview" className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Preview
                        </TabsTrigger>
                        <TabsTrigger value="code" className="flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          HTML Code
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="preview" className="mt-4">
                        <OfferPreview
                          offer={currentOffer}
                          variationId={currentOffer.selectedVariation || 'classic'}
                          customColors={currentOffer.selectedVariation === 'custom' ? currentOffer.customColors : undefined}
                        />
                      </TabsContent>
                      
                      <TabsContent value="code" className="mt-4">
                        <GeneratedHtml
                          offer={currentOffer}
                          variationId={currentOffer.selectedVariation || 'classic'}
                          customColors={currentOffer.selectedVariation === 'custom' ? currentOffer.customColors : undefined}
                        />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Phase 3 Features Status */}
                <Card className="border-emerald-200 bg-emerald-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-emerald-800">Phase 3 Features Active</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>Enhanced Disclaimer Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>Advanced Download Options</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>Enhanced Dealer Information</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span>Image Upload (Beta)</span>
                      </div>
                    </div>
                    <div className="text-xs text-emerald-700 pt-2 border-t border-emerald-200">
                      All Phase 3 features are now available. Ready for UI fine-tuning phase.
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Start filling the form to see preview
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Enter any field to see a live preview. Color themes will automatically adjust based on selected make.
                    </p>
                    <div className="text-sm text-gray-500 space-y-2">
                      <p>💡 <strong>Pro Tip:</strong> Click on any offer above to expand and start editing.</p>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="text-xs font-medium text-blue-800 mb-1">New in Phase 3:</div>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>• Enhanced disclaimer options with custom truncation</li>
                          <li>• Advanced download functionality (.txt and .html)</li>
                          <li>• Improved dealer information placement</li>
                          <li>• Beta image upload placeholder</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
