
'use client';

import { OfferData, CustomColors } from '@/lib/types';
import { generateOfferHTML } from '@/lib/template-generator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OfferPreviewProps {
  offer: OfferData;
  variationId: string;
  customColors?: CustomColors;
}

export function OfferPreview({ offer, variationId, customColors }: OfferPreviewProps) {
  const htmlContent = generateOfferHTML(offer, variationId, customColors);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Live Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden bg-gray-50">
          <iframe
            srcDoc={htmlContent}
            className="w-full h-96 border-0"
            title="Offer Preview"
            sandbox="allow-scripts"
          />
        </div>
      </CardContent>
    </Card>
  );
}
