import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

async function run() {
  const query = '^GSPC';
  const queryOptions = { period1: new Date('1950-01-01'), period2: new Date(), interval: '1mo' };
  const chartResult = await yahooFinance.chart(query, queryOptions);
  const result = chartResult.quotes;
  
  if (result && result.length > 24) {
    const monthlyReturns = [];
    for(let i = 1; i < result.length; i++) {
        if (!result[i].close || !result[i-1].close) {
             console.log(`Missing close at index ${i}:`, result[i].close);
             continue;
        }
        monthlyReturns.push( (result[i].close - result[i-1].close) / result[i-1].close );
    }
    
    // Simulating exactly what I have in index.astro WITHOUT the continue block:
    const monthlyReturnsRaw = [];
    for(let i = 1; i < result.length; i++) {
        monthlyReturnsRaw.push( (result[i].close - result[i-1].close) / result[i-1].close );
    }
    // Check if NaN is present:
    console.log("Has NaN in Raw? ", monthlyReturnsRaw.some(isNaN));
    
    const meanMonthly = monthlyReturns.reduce((a,b)=>a+b, 0) / monthlyReturns.length;
    let varSum = 0;
    for(const r of monthlyReturns) varSum += Math.pow(r - meanMonthly, 2);
    const varMonthly = varSum / monthlyReturns.length;
    
    const historicalMeanReturn = meanMonthly * 12; // Annualized arithmetic mean
    const historicalVolatility = Math.sqrt(varMonthly) * Math.sqrt(12); // Annualized standard deviation
    
    console.log(`Computed Mean = ${(historicalMeanReturn*100).toFixed(2)}%, Volatility = ${(historicalVolatility*100).toFixed(2)}%`);
  }
}
run();
