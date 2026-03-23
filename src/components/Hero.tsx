import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ dataRangeConfig }: { dataRangeConfig: string }) {
  return (
    <section className="hero-section container">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="badge">Section 530A / OBBBA 2025</div>
        <h1 className="hero-title">
          The 18-Year <br/><span className="text-gradient">Multiplier Effect</span>
        </h1>
        <p className="hero-subtitle">
          How the Trump Account leverages federal seeds, tax-free growth, and employer matches to build generational wealth for American families.
        </p>
        <p className="hero-meta">Powered by real historical S&P 500 records: {dataRangeConfig}</p>
      </motion.div>
    </section>
  );
}
