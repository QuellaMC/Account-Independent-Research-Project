function randomNormal(mean, stdDev) {
  let u1 = Math.random();
  let u2 = Math.random();
  if (u1 === 0) u1 = Number.EPSILON;
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

const input = {
  monthlyContribution: 200,
  employerMatchAnnual: 1000,
  yearsToMatriculation: 18,
  historicalMeanReturn: 0.0988,
  historicalVolatility: 0.1504
};

const numSimulations = 1000;
const results = new Float64Array(numSimulations);
const initialSeed = 1000;
const totalMonthlyInput = input.monthlyContribution + (input.employerMatchAnnual / 12);

for (let i = 0; i < numSimulations; i++) {
  let balance = initialSeed;
  for (let y = 0; y < 18; y++) {
    const annualReturn = randomNormal(input.historicalMeanReturn, input.historicalVolatility);
    const monthlyRate = annualReturn / 12;
    for(let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + totalMonthlyInput;
    }
  }
  results[i] = balance;
}
results.sort();
console.log("Median final balance:", results[Math.floor(results.length/2)]);
