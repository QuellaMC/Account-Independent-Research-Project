import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Pizza, Utensils, Smartphone, Car, Plane } from 'lucide-react';

const tiers = [
  { tier: "Poverty Line", income: 30000, monthly: 30, daily: 1.0, desc: "pocket change", result: 51937, mult: 4.8, icon: <Coffee size={24} /> },
  { tier: "Working Class", income: 45000, monthly: 60, daily: 2.0, desc: "a gas station coffee", result: 75394, mult: 5.8, icon: <Coffee size={24} /> },
  { tier: "Lower Middle", income: 60000, monthly: 120, daily: 4.0, desc: "a cafe latte", result: 122298, mult: 4.7, icon: <Coffee size={24} /> },
  { tier: "Median Income", income: 75000, monthly: 200, daily: 6.7, desc: "a fast food meal", result: 184851, mult: 4.3, icon: <Pizza size={24} /> },
  { tier: "Upper Middle", income: 100000, monthly: 300, daily: 10.0, desc: "a casual lunch", result: 263035, mult: 4.1, icon: <Utensils size={24} /> },
  { tier: "High Income", income: 150000, monthly: 500, daily: 16.4, desc: "a dining app order", result: 419250, mult: 3.8, icon: <Smartphone size={24} /> },
  { tier: "Very High Income", income: 250000, monthly: 800, daily: 26.3, desc: "a car payment", result: 653810, mult: 3.7, icon: <Car size={24} /> },
  { tier: "Top 1%", income: 500000, monthly: 1500, daily: 49.3, desc: "a weekend trip", result: 1200950, mult: 3.7, icon: <Plane size={24} /> }
];

export default function IncomeTiers() {
  const formatMoney = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  return (
    <section className="container section-spacing" style={{ paddingTop: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          What Does This Mean For Me?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          The multiplier effect translates tiny daily habits into massive generational wealth over 18 years.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {tiers.map((t, i) => (
          <motion.div
            key={i}
            className="glass-card"
            style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5, borderColor: 'var(--accent-blue)' }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)', marginBottom: '16px' }}>
              {t.icon}
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.tier}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 24px' }}>
              ${(t.income / 1000).toFixed(0)}k / year
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px', width: '100%', marginBottom: '24px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)' }}>
                ${t.daily.toFixed(1)} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 400 }}>/ day</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--accent-blue)', marginTop: '4px' }}>
                ~ {t.desc}
              </div>
            </div>

            <div style={{ flex: 1 }} />

            <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Age 18 Balance
            </div>
            <div className="text-gradient" style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
              {formatMoney(t.result)}
            </div>

            <div style={{ marginTop: '16px', padding: '6px 12px', background: 'rgba(16,185,129,0.1)', color: 'var(--accent-emerald)', borderRadius: '100px', fontSize: '12px', fontWeight: 700 }}>
              {t.mult}x Policy Multiplier
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
