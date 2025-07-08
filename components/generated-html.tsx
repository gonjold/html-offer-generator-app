
'use client';

import { useState } from 'react';
import { OfferData, CustomColors } from '@/lib/types';
import { generateOfferHTML } from '@/lib/template-generator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GeneratedHtmlProps {
  offer: OfferData;
  variationId: string;
  customColors?: CustomColors;
}

export function GeneratedHtml({ offer, variationId, customColors }: GeneratedHtmlProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const htmlContent = generateOfferHTML(offer, variationId, customColors);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "HTML code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${offer.modelYear}-${offer.model}-offer.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "HTML file downloaded successfully",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Generated HTML Code</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="h-8"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-8"
          >
            {copied ? (
              <Check className="h-4 w-4 mr-1" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          value={htmlContent}
          readOnly
          className="font-mono text-sm h-64 resize-none"
          placeholder="Generated HTML will appear here..."
        />
      </CardContent>
    </Card>
  );
}
