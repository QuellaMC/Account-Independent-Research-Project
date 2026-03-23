import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Calculator from './Calculator';

describe('Calculator React Component', () => {
  it('renders the core elements correctly', () => {
    // Provide mocked realistic params
    render(<Calculator historicalMeanReturn={0.125} historicalVolatility={0.169} dataRangeConfig="1950-2024" />);
    
    expect(screen.getByText(/Future College Savings/i)).toBeInTheDocument();
    expect(screen.getByTestId('annual-input')).toBeInTheDocument();
    expect(screen.getByTestId('match-input')).toBeInTheDocument();
    expect(screen.getByTestId('uni-select')).toBeInTheDocument();
  });

  it('updates calculations when inputs change', async () => {
    render(<Calculator historicalMeanReturn={0.125} historicalVolatility={0.169} dataRangeConfig="1950-2024" />);
    
    const input = screen.getByTestId('annual-input');
    const previousSavingsNode = screen.getByText(/Median End Balance/i).nextElementSibling;
    const previousSavings = previousSavingsNode ? previousSavingsNode.textContent : "";
    
    fireEvent.change(input, { target: { value: '10000' } });
    
    await waitFor(() => {
      const newSavingsNode = screen.getByText(/Median End Balance/i).nextElementSibling;
      const newSavings = newSavingsNode ? newSavingsNode.textContent : "";
      expect(newSavings).not.toBe(previousSavings);
    });
  });
});
