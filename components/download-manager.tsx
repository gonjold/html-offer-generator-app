
'use client';

import { useState } from 'react';
import { OfferData, DownloadOptions, DEFAULT_DOWNLOAD_OPTIONS, validateOfferForDownload } from '@/lib/types';
import { generateOfferHTML, generateMultipleOffersHTML } from '@/lib/template-generator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Code, Archive, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DownloadManagerProps {
  offers: OfferData[];
  className?: string;
}

export function DownloadManager({ offers, className }: DownloadManagerProps) {
  const [downloadOptions, setDownloadOptions] = useState<DownloadOptions>(DEFAULT_DOWNLOAD_OPTIONS);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  // Validate offers for download
  const validationResults = offers.map(offer => validateOfferForDownload(offer));
  const validOffers = offers.filter((_, index) => validationResults[index].isValid);
  const invalidOffers = offers.filter((_, index) => !validationResults[index].isValid);

  const handleOptionChange = (field: keyof DownloadOptions, value: any) => {
    setDownloadOptions(prev => ({ ...prev, [field]: value }));
  };

  const generateFilename = (type: 'html' | 'txt', isMultiple: boolean = false) => {
    const baseFilename = downloadOptions.customFilename || 
      (isMultiple ? 'automotive-offers-collection' : `${validOffers[0]?.make || 'vehicle'}-${validOffers[0]?.model || 'offer'}`);
    
    const timestamp = downloadOptions.includeTimestamp 
      ? `-${new Date().toISOString().slice(0, 10)}`
      : '';
    
    return `${baseFilename}${timestamp}.${type}`;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePlainTextOffer = (offer: OfferData): string => {
    const year = offer.modelYear || 'YEAR';
    const make = offer.make || 'MAKE';
    const model = offer.model || 'MODEL';
    
    let content = `${year} ${make} ${model} Automotive Offer\n`;
    content += `${'='.repeat(content.length - 1)}\n\n`;
    
    if (offer.price) content += `Price: ${offer.price} per month\n`;
    if (offer.apr) content += `APR: ${offer.apr}\n`;
    if (offer.aprCash) content += `Bonus: ${offer.aprCash}\n`;
    
    content += '\nCall-to-Action Buttons:\n';
    offer.ctaButtons?.forEach((cta, index) => {
      content += `  ${index + 1}. ${cta.text} - ${cta.link}\n`;
    });
    
    if (offer.dealerName) content += `\nDealer: ${offer.dealerName}\n`;
    if (offer.dealerLocation) content += `Location: ${offer.dealerLocation}\n`;
    
    content += `\nDisclaimer:\n${offer.fullDisclaimer}\n`;
    
    if (downloadOptions.includeTimestamp) {
      content += `\nGenerated: ${new Date().toLocaleString()}\n`;
    }
    
    return content;
  };

  const handleDownloadSingle = async (offer: OfferData, format: 'html' | 'txt' | 'both') => {
    setIsDownloading(true);
    
    try {
      if (format === 'html' || format === 'both') {
        const htmlContent = generateOfferHTML(
          offer,
          offer.selectedVariation || 'classic',
          offer.selectedVariation === 'custom' ? offer.customColors : undefined
        );
        downloadFile(htmlContent, generateFilename('html'), 'text/html');
      }
      
      if (format === 'txt' || format === 'both') {
        const txtContent = generatePlainTextOffer(offer);
        downloadFile(txtContent, generateFilename('txt'), 'text/plain');
      }
      
      toast({
        title: "Download successful!",
        description: `Offer downloaded as ${format.toUpperCase()} file${format === 'both' ? 's' : ''}`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "An error occurred while downloading the file",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadMultiple = async () => {
    if (validOffers.length === 0) return;
    
    setIsDownloading(true);
    
    try {
      if (downloadOptions.format === 'html' || downloadOptions.format === 'both') {
        const htmlContent = generateMultipleOffersHTML(
          validOffers,
          validOffers[0].selectedVariation || 'classic',
          validOffers[0].selectedVariation === 'custom' ? validOffers[0].customColors : undefined
        );
        downloadFile(htmlContent, generateFilename('html', true), 'text/html');
      }
      
      if (downloadOptions.format === 'txt' || downloadOptions.format === 'both') {
        let txtContent = `Automotive Offers Collection\n${'='.repeat(30)}\n\n`;
        
        validOffers.forEach((offer, index) => {
          txtContent += `Offer #${index + 1}\n${'-'.repeat(10)}\n`;
          txtContent += generatePlainTextOffer(offer);
          txtContent += '\n\n';
        });
        
        downloadFile(txtContent, generateFilename('txt', true), 'text/plain');
      }
      
      toast({
        title: "Download successful!",
        description: `${validOffers.length} offers downloaded successfully`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "An error occurred while downloading the files",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Download Manager
          <Badge variant="secondary" className="text-xs">Phase 3</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Validation Status */}
        <div className="space-y-3">
          {validOffers.length > 0 && (
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                {validOffers.length} offer{validOffers.length > 1 ? 's' : ''} ready for download
              </span>
            </div>
          )}
          
          {invalidOffers.length > 0 && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <div className="font-medium mb-1">
                  {invalidOffers.length} offer{invalidOffers.length > 1 ? 's' : ''} incomplete:
                </div>
                {invalidOffers.map((offer, index) => {
                  const validation = validationResults[offers.indexOf(offer)];
                  return (
                    <div key={offer.id} className="text-xs">
                      Offer #{offers.indexOf(offer) + 1}: Missing {validation.missingFields.join(', ')}
                    </div>
                  );
                })}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Separator />

        {/* Download Options */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Download Options</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="format">File Format</Label>
              <Select 
                value={downloadOptions.format} 
                onValueChange={(value: 'html' | 'txt' | 'both') => handleOptionChange('format', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">
                    <div className="flex items-center gap-2">
                      <Code className="h-3 w-3" />
                      HTML Only
                    </div>
                  </SelectItem>
                  <SelectItem value="txt">
                    <div className="flex items-center gap-2">
                      <FileText className="h-3 w-3" />
                      Text Only
                    </div>
                  </SelectItem>
                  <SelectItem value="both">
                    <div className="flex items-center gap-2">
                      <Archive className="h-3 w-3" />
                      Both Formats
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filename">Custom Filename (Optional)</Label>
              <Input
                id="filename"
                placeholder="e.g., toyota-summer-offers"
                value={downloadOptions.customFilename || ''}
                onChange={(e) => handleOptionChange('customFilename', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="timestamp" className="text-sm">Include Timestamp</Label>
              <Switch
                id="timestamp"
                checked={downloadOptions.includeTimestamp}
                onCheckedChange={(checked) => handleOptionChange('includeTimestamp', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="inlineCSS" className="text-sm">Include Inline CSS</Label>
              <Switch
                id="inlineCSS"
                checked={downloadOptions.includeInlineCSS}
                onCheckedChange={(checked) => handleOptionChange('includeInlineCSS', checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Download Buttons */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Download Actions</h4>
          
          {/* Individual Downloads */}
          {validOffers.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs text-gray-600">Individual Offers:</Label>
              <div className="grid grid-cols-1 gap-2">
                {validOffers.map((offer, index) => (
                  <div key={offer.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="text-sm">
                      {offer.modelYear} {offer.make} {offer.model}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadSingle(offer, 'html')}
                        disabled={isDownloading}
                        className="px-2 text-xs"
                      >
                        HTML
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadSingle(offer, 'txt')}
                        disabled={isDownloading}
                        className="px-2 text-xs"
                      >
                        TXT
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Bulk Download */}
          {validOffers.length > 1 && (
            <div className="space-y-2">
              <Label className="text-xs text-gray-600">Bulk Download:</Label>
              <Button
                onClick={handleDownloadMultiple}
                disabled={isDownloading || validOffers.length === 0}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading ? 'Downloading...' : `Download All ${validOffers.length} Offers`}
              </Button>
            </div>
          )}
        </div>

        {/* Format Information */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-xs font-medium text-blue-800 mb-2">File Format Guide:</div>
          <ul className="space-y-1 text-xs text-blue-700">
            <li>• <strong>HTML:</strong> Ready-to-use email templates with styling</li>
            <li>• <strong>TXT:</strong> Plain text version for CMS or manual copying</li>
            <li>• <strong>Both:</strong> Download HTML and TXT versions simultaneously</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
