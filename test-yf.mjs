import yahooFinance from 'yahoo-finance2';
try {
  let yf = yahooFinance;
  // If we need to instantiate:
  // import { YahooFinance } from 'yahoo-finance2';
  // yf = new YahooFinance();
  console.log(Object.keys(yf));
} catch (e) { console.error(e); }
