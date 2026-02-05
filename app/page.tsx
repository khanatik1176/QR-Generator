'use client';
import React from 'react';
import Link from 'next/link';
import { MapPin, Truck, BarChart2, Clock, Users, TrendingUp, QrCode } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function Home() {

  redirect('/products');

  return (
    <div>
      <p>Home</p>
    </div>
  );
}