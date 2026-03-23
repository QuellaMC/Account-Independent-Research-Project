import * as yf from 'yahoo-finance2';
async function run() {
  console.log("Keys of yf:", Object.keys(yf));
  console.log("Keys of yf.default:", yf.default ? Object.keys(yf.default) : "No default");
}
run();
