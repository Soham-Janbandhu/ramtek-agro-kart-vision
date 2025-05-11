
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AboutSection from '@/components/home/AboutSection';
import StatsSection from '@/components/home/StatsSection';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <StatsSection />
    </MainLayout>
  );
};

export default Index;
