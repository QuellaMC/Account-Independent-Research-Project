import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ShieldCheck, Handshake } from 'lucide-react';

const cards = [
  {
    icon: <Building2 size={36} strokeWidth={1.5} className="text-blue" />,
    title: "Federal Seed Deposit",
    tag: "Confirmed",
    desc: "$1,000 injected automatically at birth by the government. Zero out-of-pocket required to start."
  },
  {
    icon: <ShieldCheck size={36} strokeWidth={1.5} className="text-purple" />,
    title: "Tax-Free Growth",
    tag: "Confirmed",
    desc: "18 years of compounding without the 15% annual capital gains drag. The true hidden engine of the account."
  },
  {
    icon: <Handshake size={36} strokeWidth={1.5} className="text-emerald" />,
    title: "Employer Match",
    tag: "Pending Details",
    desc: "Up to $2,500/yr matched tax-free by participating employers, turbocharging middle-class savings."
  }
];

export default function PolicyCards() {
  return (
    <section className="container section-spacing">
      <div className="policy-grid">
        {cards.map((c, i) => (
          <motion.div 
            key={i}
            className="glass-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="card-icon">{c.icon}</div>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px'}}>
              <h3 className="card-title">{c.title}</h3>
              <span className={`status-tag ${c.tag === 'Confirmed' ? 'tag-green' : 'tag-orange'}`}>{c.tag}</span>
            </div>
            <p className="card-desc">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
