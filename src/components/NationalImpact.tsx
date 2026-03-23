import React from 'react';
import { motion } from 'framer-motion';
import { Globe2 } from 'lucide-react';

export default function NationalImpact() {
  return (
    <section className="container section-spacing" style={{ borderTop: '1px solid var(--border-light)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '64px', alignItems: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
            <Globe2 size={18} /> Scale Impact
          </div>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            One Generation's <br/><span className="text-gradient">Potential</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
            If 70% of the 3.63 million newborns each year use a Trump Account, the total generational wealth created in 18 years dwarfs anything previously conceived in educational aid.
          </p>
          <p style={{ fontSize: '16px', color: 'var(--text-main)', lineHeight: 1.6 }}>
            It has the potential to solve the student debt crisis from the bottom up, without canceling a single loan.
          </p>
        </motion.div>

        <motion.div 
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Current Outstanding Student Debt
            </div>
            <div style={{ fontSize: '48px', fontWeight: 800, color: '#ef4444', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '12px' }}>
              $1.83 Trillion
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>43 Million Borrowers (2025)</p>
          </div>

          <div className="glass-card" style={{ padding: '32px', borderColor: 'rgba(16,185,129,0.3)', boxShadow: '0 0 60px rgba(16,185,129,0.1)' }}>
            <div style={{ fontSize: '12px', color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontWeight: 700 }}>
              Projected Trump Account Funds (1 Cohort)
            </div>
            <div className="text-gradient-emerald" style={{ fontSize: '64px', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '12px' }}>
              $360 Billion+
            </div>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-main)' }}>
              Ready to deploy for college in exactly 18 years, drastically reducing the demand for new federal aid.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
