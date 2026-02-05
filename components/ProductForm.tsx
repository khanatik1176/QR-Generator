'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export interface ProductData {
  name: string;
  description: string;
  price: string;
  sku: string;
  category: string;
  quantity: string;
  manufacturer?: string;
  expiryDate?: string;
}

interface ProductFormProps {
  onSubmit: (data: ProductData) => void;
  isLoading?: boolean;
}

export default function ProductForm({ onSubmit, isLoading = false }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductData>({
    name: '',
    description: '',
    price: '',
    sku: '',
    category: '',
    quantity: '',
    manufacturer: '',
    expiryDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.price || !formData.sku) {
      alert('Please fill in all required fields (Name, Price, SKU)');
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create Product QR Code</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="font-semibold">
            Product Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="font-semibold">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price" className="font-semibold">
              Price <span className="text-red-500">*</span>
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="0.00"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label htmlFor="sku" className="font-semibold">
              SKU <span className="text-red-500">*</span>
            </Label>
            <Input
              id="sku"
              name="sku"
              type="text"
              placeholder="e.g., PROD-001"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Category and Quantity */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category" className="font-semibold">
              Category
            </Label>
            <Input
              id="category"
              name="category"
              type="text"
              placeholder="e.g., Electronics"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="font-semibold">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="0"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Manufacturer and Expiry Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="manufacturer" className="font-semibold">
              Manufacturer
            </Label>
            <Input
              id="manufacturer"
              name="manufacturer"
              type="text"
              placeholder="Enter manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate" className="font-semibold">
              Expiry Date
            </Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 mt-6"
          disabled={isLoading}
        >
          {isLoading ? 'Generating QR Code...' : 'Generate QR Code'}
        </Button>
      </form>
    </Card>
  );
}
