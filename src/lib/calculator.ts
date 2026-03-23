export type UniversityType = 'public' | 'private';

export interface CalculatorInput {
  annualContribution: number;
  employerMatchAnnual: number;
  universityType: UniversityType;
  yearsToMatriculation?: number; // default 18
  historicalMeanReturn: number; 
  historicalVolatility: number; 
}

export interface SimulationPoint {
  id: number;
  savingsBalance: number; // For X axis
  tuitionCost: number;    // For Y axis
  isSuccess: boolean;
}

export interface SimulationOutput {
  scatterPoints: SimulationPoint[];
  expectedTuition: number; // Median
  medianSavings: number;
  successRate: number;
}

// Current average 4-year tuition
const CURRENT_TUITION_COSTS = {
  public: 48000, 
  private: 180000, 
};

const TUITION_INFLATION = 0.05;
const TUITION_VOLATILITY = 0.02;

export function simulateCollegeSavings(input: CalculatorInput): SimulationOutput {
  const years = input.yearsToMatriculation ?? 18;
  const numSimulations = 1000;
  
  const startTuition = CURRENT_TUITION_COSTS[input.universityType];
  const initialSeed = 1000;
  
  const points: SimulationPoint[] = [];
  let successCount = 0;
  
  const totalMonthlyInput = (input.annualContribution + input.employerMatchAnnual) / 12;

  const savingsResults = new Float64Array(numSimulations);
  const tuitionResults = new Float64Array(numSimulations);

  for (let i = 0; i < numSimulations; i++) {
    let balance = initialSeed;
    let cost = startTuition;
    
    for (let y = 0; y < years; y++) {
      // Annual return via Geometric Brownian Motion approx
      const annualReturn = randomNormal(input.historicalMeanReturn, input.historicalVolatility);
      const monthlyRate = annualReturn / 12;
      
      for(let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyRate) + totalMonthlyInput;
      }
      
      // Tuition also inflates stochastically (like real Python model)
      const tuitionInc = Math.max(randomNormal(TUITION_INFLATION, TUITION_VOLATILITY), -0.05);
      cost *= (1 + tuitionInc);
    }
    
    savingsResults[i] = balance;
    tuitionResults[i] = cost;
    
    const isSuccess = balance >= cost;
    if (isSuccess) successCount++;
    
    points.push({
      id: i,
      savingsBalance: balance,
      tuitionCost: cost,
      isSuccess,
    });
  }
  
  savingsResults.sort();
  tuitionResults.sort();

  return {
    scatterPoints: points,
    expectedTuition: tuitionResults[Math.floor(numSimulations * 0.5)],
    medianSavings: savingsResults[Math.floor(numSimulations * 0.5)],
    successRate: (successCount / numSimulations) * 100
  };
}

function randomNormal(mean: number, stdDev: number): number {
  let u1 = Math.random();
  let u2 = Math.random();
  if (u1 === 0) u1 = Number.EPSILON;
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}
