import { describe, it, expect } from 'vitest';
import { simulateCollegeSavings } from './calculator';

describe('Calculator Core Logic', () => {
  it('should generate accurate realistic probabilities based on exact parameters', () => {
    const output = simulateCollegeSavings({
      annualContribution: 5000,
      employerMatchAnnual: 1000,
      universityType: 'public',
      historicalMeanReturn: 0.125,
      historicalVolatility: 0.169,
    });

    // 1000 scatter points
    expect(output.scatterPoints).toHaveLength(1000);
    // Median savings roughly above $100k for 18 years at $500/mo @ 12.5%
    expect(output.medianSavings).toBeGreaterThan(100000);
    expect(output.successRate).toBeGreaterThanOrEqual(0);
    expect(output.successRate).toBeLessThanOrEqual(100);
  });
});
