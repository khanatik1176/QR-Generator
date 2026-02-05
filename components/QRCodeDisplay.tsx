'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Copy, ArrowLeft, ExternalLink } from 'lucide-react';
import { ProductData } from './ProductForm';

interface QRCodeDisplayProps {
  productData: ProductData;
  onBack: () => void;
}

export default function QRCodeDisplay({ productData, onBack }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [QRCodeCanvas, setQRCodeCanvas] = useState<React.ComponentType<any> | null>(null);

  // Dynamically import qrcode.react on client side only
  useEffect(() => {
    import('qrcode.react').then((mod) => {
      setQRCodeCanvas(() => mod.QRCodeCanvas);
    });
  }, []);

  // Generate URL with encoded product data for QR code
  const getQRUrl = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const encodedData = encodeURIComponent(JSON.stringify(productData));
    return `${baseUrl}/product/view?data=${encodedData}`;
  };

  const qrValue = getQRUrl();

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${productData.sku}-qrcode.png`;
      link.click();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrValue);
    alert('QR Code URL copied to clipboard!');
  };

  const openPreview = () => {
    window.open(qrValue, '_blank');
  };

  return (
    <div className="w-full space-y-6">
      {/* Display Product Data */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-4">{productData.name}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Description</p>
            <p className="font-semibold">{productData.description || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Price</p>
            <p className="font-semibold text-lg text-orange-600">${productData.price}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">SKU</p>
            <p className="font-semibold">{productData.sku}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Category</p>
            <p className="font-semibold">{productData.category || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Quantity</p>
            <p className="font-semibold">{productData.quantity || '0'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Manufacturer</p>
            <p className="font-semibold">{productData.manufacturer || 'N/A'}</p>
          </div>
          {productData.expiryDate && (
            <div>
              <p className="text-sm text-gray-600">Expiry Date</p>
              <p className="font-semibold">{productData.expiryDate}</p>
            </div>
          )}
        </div>
      </Card>

      {/* QR Code Display */}
      <Card className="p-8 flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-2">Product QR Code</h3>
        <p className="text-sm text-gray-500 mb-6">Scan with any mobile device to view product details</p>
        
        <div
          ref={qrRef}
          className="bg-white p-4 border-4 border-gray-200 rounded-lg"
        >
          {QRCodeCanvas ? (
            <QRCodeCanvas 
              value={qrValue} 
              size={300} 
              level="H" 
              includeMargin={true} 
            />
          ) : (
            <div className="w-[300px] h-[300px] bg-gray-200 rounded animate-pulse flex items-center justify-center">
              <span className="text-gray-500">Loading QR Code...</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          <Button
            onClick={downloadQRCode}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="h-4 w-4" />
            Download QR
          </Button>
          <Button
            onClick={openPreview}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ExternalLink className="h-4 w-4" />
            Preview Page
          </Button>
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy URL
          </Button>
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Create New
          </Button>
        </div>
      </Card>
    </div>
  );
}