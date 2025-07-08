
'use client';

import { useState } from 'react';
import { VehicleImage, createPlaceholderImage } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Image, Camera, AlertTriangle, Star } from 'lucide-react';

interface ImageUploadPlaceholderProps {
  vehicleImage?: VehicleImage;
  onImageChange: (image: VehicleImage | undefined) => void;
}

export function ImageUploadPlaceholder({ vehicleImage, onImageChange }: ImageUploadPlaceholderProps) {
  const [showBetaInfo, setShowBetaInfo] = useState(false);

  const handleAddPlaceholder = () => {
    const placeholderImage = createPlaceholderImage();
    onImageChange(placeholderImage);
  };

  const handleRemovePlaceholder = () => {
    onImageChange(undefined);
  };

  return (
    <Card className="border-amber-200 bg-amber-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <span className="p-1 bg-amber-100 rounded">
            <Camera className="h-3 w-3 text-amber-600" />
          </span>
          Vehicle Image Upload
          <Badge variant="outline" className="text-xs border-amber-400 text-amber-700">
            Beta
          </Badge>
          <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Beta Alert */}
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 text-sm">
            <strong>Beta Feature:</strong> Image upload functionality is currently in development. 
            You can add a placeholder to prepare your template structure.
          </AlertDescription>
        </Alert>

        {/* Current State */}
        {vehicleImage ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white border border-amber-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded">
                  <Image className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">{vehicleImage.filename}</div>
                  <div className="text-xs text-gray-500">{vehicleImage.altText}</div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">Placeholder</Badge>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemovePlaceholder}
              className="w-full"
            >
              Remove Placeholder
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-amber-300 rounded-lg bg-amber-50/50">
              <Upload className="h-8 w-8 text-amber-500 mb-2" />
              <div className="text-sm text-amber-700 text-center">
                <div className="font-medium">No image selected</div>
                <div className="text-xs mt-1">Add a placeholder to reserve space for vehicle images</div>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={handleAddPlaceholder}
              className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              <Image className="h-4 w-4 mr-2" />
              Add Image Placeholder
            </Button>
          </div>
        )}

        {/* Feature Information */}
        <div className="space-y-3">
          <button
            onClick={() => setShowBetaInfo(!showBetaInfo)}
            className="flex items-center gap-2 text-xs text-amber-700 hover:text-amber-800"
          >
            <Star className="h-3 w-3" />
            {showBetaInfo ? 'Hide' : 'Show'} upcoming features
          </button>

          {showBetaInfo && (
            <div className="p-3 bg-white border border-amber-200 rounded-lg">
              <div className="text-xs font-medium text-amber-800 mb-2">Planned Features:</div>
              <ul className="space-y-1 text-xs text-amber-700">
                <li>• Drag & drop image upload</li>
                <li>• Automatic image optimization and resizing</li>
                <li>• Multiple image support (gallery mode)</li>
                <li>• Image position controls (left, right, center)</li>
                <li>• Alt text management for accessibility</li>
                <li>• Integration with stock photo services</li>
              </ul>
            </div>
          )}
        </div>

        {/* Template Impact */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-xs font-medium text-blue-800 mb-1">Template Impact:</div>
          <div className="text-xs text-blue-700">
            Adding image placeholders helps structure your email template for future image integration. 
            The placeholder reserves appropriate spacing and maintains layout consistency.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
