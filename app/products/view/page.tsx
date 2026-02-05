'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Package, DollarSign, Tag, Layers, Factory, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProductData {
  name: string;
  description: string;
  price: string;
  sku: string;
  category: string;
  quantity: string;
  manufacturer?: string;
  expiryDate?: string;
}

export default function ProductViewPage() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const data = searchParams.get('data');
      if (data) {
        const decoded = JSON.parse(decodeURIComponent(data));
        setProduct(decoded);
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Invalid QR Code</h1>
          <p className="text-gray-600 mb-6">This QR code doesn&apos;t contain valid product information.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Go to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-orange-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-orange-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-orange-100 text-sm">Product Details</p>
              <h1 className="text-xl font-bold">{product.name}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 -mt-4">
        {/* Price Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Price</p>
              <p className="text-4xl font-bold text-green-600">${product.price}</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <h2 className="text-gray-500 text-sm mb-2">Description</h2>
            <p className="text-gray-800 leading-relaxed">{product.description}</p>
          </div>
        )}

        {/* Details Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <h2 className="text-gray-500 text-sm mb-4">Product Information</h2>
          <div className="space-y-4">
            {/* SKU */}
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Tag className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">SKU</p>
                <p className="font-semibold text-gray-800">{product.sku}</p>
              </div>
            </div>

            {/* Category */}
            {product.category && (
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Layers className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="font-semibold text-gray-800">{product.category}</p>
                </div>
              </div>
            )}

            {/* Quantity */}
            {product.quantity && (
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Stock Quantity</p>
                  <p className="font-semibold text-gray-800">{product.quantity} units</p>
                </div>
              </div>
            )}

            {/* Manufacturer */}
            {product.manufacturer && (
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Factory className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Manufacturer</p>
                  <p className="font-semibold text-gray-800">{product.manufacturer}</p>
                </div>
              </div>
            )}

            {/* Expiry Date */}
            {product.expiryDate && (
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Expiry Date</p>
                  <p className="font-semibold text-gray-800">{product.expiryDate}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-gray-400 text-sm">
            Scanned via Motor Telematics QR
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-orange-500 font-medium mt-2 hover:text-orange-600"
          >
            Create your own QR Code
          </Link>
        </div>
      </div>
    </div>
  );
}