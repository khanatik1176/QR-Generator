'use client';

import React, { useState } from 'react';
import ProductForm, { ProductData } from '@/components/ProductForm';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import ProductScanner from '@/components/ProductScanner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Plus, Scan } from 'lucide-react';

type ViewType = 'menu' | 'create' | 'scan' | 'display';

export default function ProductQRPage() {
  const [view, setView] = useState<ViewType>('menu');
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  const handleFormSubmit = (data: ProductData) => {
    setSelectedProduct(data);
    setView('display');
  };

  const handleBackToMenu = () => {
    setView('menu');
    setSelectedProduct(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 text-orange-600 mb-4">
            <QrCode className="h-7 w-7" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Product QR Code Generator
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Create unique QR codes for your products. Embed product information and make it accessible with a simple scan.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {view === 'menu' && (
          <div className="space-y-6">
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-5 shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Plus className="h-6 w-6 text-orange-500" />
                  <div className="font-semibold">Create QR Code</div>
                </div>
                <p className="text-sm text-gray-600">Generate QR codes for your products with all relevant details embedded.</p>
              </div>

              <div className="bg-white rounded-lg p-5 shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Scan className="h-6 w-6 text-blue-600" />
                  <div className="font-semibold">Scan & View</div>
                </div>
                <p className="text-sm text-gray-600">Scan product QR codes to instantly view complete product information.</p>
              </div>

              <div className="bg-white rounded-lg p-5 shadow">
                <div className="flex items-center gap-3 mb-3">
                  <QrCode className="h-6 w-6 text-green-600" />
                  <div className="font-semibold">Download & Share</div>
                </div>
                <p className="text-sm text-gray-600">Download QR codes as images and share with customers or print on packaging.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setView('create')}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                  <Plus className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Create QR Code</h3>
                <p className="text-gray-600 mb-6">Generate a new product QR code with product information</p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Get Started
                </Button>
              </Card>

              <Card className="p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setView('scan')}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Scan className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Scan QR Code</h3>
                <p className="text-gray-600 mb-6">Scan an existing product QR code to view product details</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Scan Now
                </Button>
              </Card>
            </div>
          </div>
        )}

        {view === 'create' && (
          <div className="space-y-6">
            <Button
              onClick={handleBackToMenu}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              ← Back to Menu
            </Button>
            <ProductForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {view === 'scan' && (
          <ProductScanner onBack={handleBackToMenu} />
        )}

        {view === 'display' && selectedProduct && (
          <div className="space-y-6">
            <Button
              onClick={handleBackToMenu}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              ← Back to Menu
            </Button>
            <QRCodeDisplay productData={selectedProduct} onBack={handleBackToMenu} />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Product QR Generator — All rights reserved.</div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/privacy" className="text-gray-600 hover:underline">
              Privacy
            </a>
            <a href="/terms" className="text-gray-600 hover:underline">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
