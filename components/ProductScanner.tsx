'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ProductData } from './ProductForm';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface ProductScannerProps {
  onBack: () => void;
}

export default function ProductScanner({ onBack }: ProductScannerProps) {
  const [qrData, setQrData] = useState('');
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [error, setError] = useState('');

  const handlePasteData = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setQrData(text);
      parseQRData(text);
    } catch (err) {
      setError('Failed to read clipboard. Please paste the QR data manually.');
    }
  };

  const parseQRData = (data: string) => {
    try {
      setError('');
      const parsed = JSON.parse(data);
      
      // Validate that it has expected product fields
      if (parsed.name && parsed.price && parsed.sku) {
        setProductData(parsed);
      } else {
        setError('Invalid QR code data. Missing required product fields.');
      }
    } catch (err) {
      setError('Failed to parse QR code data. Please ensure you copied the correct data.');
    }
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (qrData.trim()) {
      parseQRData(qrData);
    } else {
      setError('Please paste QR code data');
    }
  };

  const handleClearData = () => {
    setQrData('');
    setProductData(null);
    setError('');
  };

  if (productData) {
    return (
      <div className="w-full space-y-6">
        <Button
          onClick={onBack}
          className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Menu
        </Button>

        <Card className="p-8">
          <h2 className="text-3xl font-bold mb-2 text-green-600">✓ Product Found</h2>
          <p className="text-gray-600 mb-8">Here are the product details from the QR code:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-600">Product Name</p>
              <p className="text-2xl font-bold text-gray-800">{productData.name}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-600">Price</p>
              <p className="text-2xl font-bold text-orange-600">${productData.price}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-600">SKU</p>
              <p className="text-lg font-mono font-semibold text-gray-700">{productData.sku}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-600">Category</p>
              <p className="text-lg font-semibold text-gray-700">{productData.category || 'N/A'}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-600">Quantity in Stock</p>
              <p className="text-lg font-semibold text-gray-700">{productData.quantity || '0'}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-600">Manufacturer</p>
              <p className="text-lg font-semibold text-gray-700">{productData.manufacturer || 'N/A'}</p>
            </div>

            {productData.expiryDate && (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-600">Expiry Date</p>
                <p className="text-lg font-semibold text-gray-700">{productData.expiryDate}</p>
              </div>
            )}

            {productData.description && (
              <div className="space-y-1 md:col-span-2">
                <p className="text-sm font-semibold text-gray-600">Description</p>
                <p className="text-gray-700 leading-relaxed">{productData.description}</p>
              </div>
            )}
          </div>

          <Button
            onClick={handleClearData}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Scan Another Product
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Button
        onClick={onBack}
        className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Menu
      </Button>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-2">Scan Product QR Code</h2>
        <p className="text-gray-600 mb-6">
          Paste the QR code data (which you get by scanning a product QR code):
        </p>

        <form onSubmit={handleScan} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Paste QR code data here..."
              value={qrData}
              onChange={(e) => {
                setQrData(e.target.value);
                setError('');
              }}
              rows={6}
              className="font-mono text-sm"
            />
          </div>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Parse QR Data
            </Button>
            <Button
              type="button"
              onClick={handlePasteData}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
            >
              Paste from Clipboard
            </Button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>How to use:</strong> Scan a product QR code with your phone camera, copy the data, and paste it here to view product details.
          </p>
        </div>
      </Card>
    </div>
  );
}
