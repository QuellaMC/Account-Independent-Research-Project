import yahooFinance from 'yahoo-finance2'; // This might be throwing
// Let's try the strict v3 construction if it throws:
import yfLib from 'yahoo-finance2';
async function run() {
  try {
     console.log("default import:", Object.keys(yahooFinance._env || {}));
     console.log(await yahooFinance.historical('^GSPC', { period1: '2024-01-01', period2: '2024-02-01' }));
  } catch (e) { 
     console.error("FIRST ERROR:", e.message); 
  }
}
run();
