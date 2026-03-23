import React, { useState, useMemo, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { simulateCollegeSavings, type UniversityType } from '../lib/calculator';

interface Props {
  historicalMeanReturn: number;
  historicalVolatility: number;
  dataRangeConfig: string;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function Calculator({ historicalMeanReturn, historicalVolatility, dataRangeConfig }: Props) {
  // Switched back to ANNUAL contribution as per original user request
  const [annualContribution, setAnnualContribution] = useState<number>(5000);
  const debouncedAnnual = useDebounce(annualContribution, 150);
  
  const [employerMatchAnnual, setEmployerMatchAnnual] = useState<number>(0);
  const debouncedMatch = useDebounce(employerMatchAnnual, 150);
  
  const [universityType, setUniversityType] = useState<UniversityType>('public');
  
  const [showSuccess, setShowSuccess] = useState(true);
  const [showFailure, setShowFailure] = useState(true);

  const { scatterPoints, expectedTuition, medianSavings, successRate } = useMemo(() => {
    return simulateCollegeSavings({ 
      annualContribution: debouncedAnnual, 
      employerMatchAnnual: debouncedMatch,
      universityType, 
      yearsToMatriculation: 18,
      historicalMeanReturn,
      historicalVolatility
    });
  }, [debouncedAnnual, debouncedMatch, universityType, historicalMeanReturn, historicalVolatility]);

  const isStale = annualContribution !== debouncedAnnual || employerMatchAnnual !== debouncedMatch;

  const displayedData = useMemo(() => {
    return scatterPoints.filter(p => {
      if (p.isSuccess && !showSuccess) return false;
      if (!p.isSuccess && !showFailure) return false;
      return true;
    });
  }, [scatterPoints, showSuccess, showFailure]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="app-layout">
      {/* Sidebar Inputs */}
      <aside className="sidebar">
        <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '8px' }}>
          Future College Savings
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px', lineHeight: 1.5 }}>
          Monte-Carlo simulations generating 1,000 parallel 18-year realities based on real S&P 500 volatility ({dataRangeConfig}).
        </p>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-main)' }}>Show Successful</span>
            <div className={`apple-toggle ${showSuccess ? 'active' : ''}`} onClick={() => setShowSuccess(!showSuccess)}>
              <div className="toggle-thumb" />
            </div>
          </div>
          <div style={{ height: '1px', background: 'var(--border-light)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-main)' }}>Show Shortfalls</span>
            <div className={`apple-toggle ${showFailure ? 'active' : ''}`} onClick={() => setShowFailure(!showFailure)}>
              <div className="toggle-thumb" />
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>University Target</span>
            </div>
            <div className="apple-segmented-control">
              <div 
                className={`apple-segmented-item ${universityType === 'public' ? 'active' : ''}`}
                onClick={() => setUniversityType('public')}
              >
                Top Public
              </div>
              <div 
                className={`apple-segmented-item ${universityType === 'private' ? 'active' : ''}`}
                onClick={() => setUniversityType('private')}
              >
                Top Private
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Family Annual Input</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>${annualContribution.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              className="apple-slider"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(Number(e.target.value))}
              min="0"
              max="20000"
              step="500"
              data-testid="annual-input"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Employer Match</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-emerald)' }}>+ ${employerMatchAnnual.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              className="apple-slider"
              value={employerMatchAnnual}
              onChange={(e) => setEmployerMatchAnnual(Number(e.target.value))}
              min="0"
              max="10000"
              step="500"
              data-testid="match-input"
            />
          </div>
        </div>

        <div className="projection-box" style={{ background: 'transparent', padding: 0, marginTop: '16px', border: 'none' }}>
          <div className="glass-panel" style={{ background: 'rgba(79, 143, 247, 0.05)', borderColor: 'rgba(79, 143, 247, 0.2)', marginBottom: 0 }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-blue)' }}>Simulation Results</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
              <span style={{color: 'var(--text-muted)'}}>Median End Balance:</span>
              <strong style={{color: 'var(--text-main)'}}>{formatCurrency(medianSavings)}</strong>
            </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' }}>
              <span style={{color: 'var(--text-muted)'}}>Est. 4-Year Tuition:</span>
              <strong style={{color: 'var(--text-main)'}}>{formatCurrency(expectedTuition)}</strong>
            </div>
            <div style={{ height: '1px', background: 'var(--border-light)', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{color: 'var(--text-main)', fontWeight: 500}}>Success Rate:</span>
              <strong style={{fontSize: '24px', letterSpacing: '-0.02em', color: successRate > 50 ? 'var(--accent-emerald)' : 'var(--accent-orange)'}}>{successRate.toFixed(1)}%</strong>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="main-chart-area">
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '32px' }}>
          Simulated Wealth vs Target Tuition (18 Years)
        </h2>
        
        <div className="card" style={{ flex: 1, minHeight: '400px', position: 'relative', opacity: isStale ? 0.5 : 1, transition: 'opacity 0.2s', filter: isStale ? 'grayscale(0.6)' : 'none' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis 
                dataKey="savingsBalance" 
                type="number" 
                name="Projected Savings"
                tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} 
                stroke="var(--text-muted)"
                domain={['auto', 'auto']}
              >
              </XAxis>
              <YAxis 
                dataKey="tuitionCost" 
                type="number" 
                name="Projected Tuition"
                tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} 
                stroke="var(--text-muted)"
                domain={['auto', 'auto']}
              />
              <Tooltip cursor={{strokeDasharray: '3 3'}} content={({active, payload}) => {
                if (active && payload && payload.length) {
                  return (
                    <div style={{ background: 'var(--bg-card-hover)', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px', boxShadow: 'var(--shadow-glass)'}}>
                      <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'var(--text-main)' }}>Savings: {formatCurrency(payload[0].payload.savingsBalance)}</p>
                      <p style={{ margin: 0, color: 'var(--text-muted)' }}>Tuition: {formatCurrency(payload[0].payload.tuitionCost)}</p>
                    </div>
                  );
                }
                return null;
              }} />
              
              <Scatter name="Successful" data={displayedData.filter(d => d.isSuccess)} fill="var(--accent-emerald)" shape="circle" fillOpacity={0.8} />
              <Scatter name="Falling Short" data={displayedData.filter(d => !d.isSuccess)} fill="var(--text-muted)" shape="circle" fillOpacity={0.8} />
              
            </ScatterChart>
          </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
