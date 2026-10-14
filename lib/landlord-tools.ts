export type RentalInputs = {rent:number;value:number;voidWeeks:number;fee:number;mortgage:number;insurance:number;maintenance:number;other:number};

function range(value:number, min=0, max=1e9) {
  if (!Number.isFinite(value) || value < min || value > max) throw new RangeError('Enter a number within the stated range.');
}

export function calculateRental(input:RentalInputs) {
  for (const value of Object.values(input)) range(value);
  range(input.value, 1);
  range(input.voidWeeks, 0, 52);
  range(input.fee, 0, 100);
  const fullRent = input.rent * 12;
  const collectedRent = fullRent * (1 - input.voidWeeks / 52);
  const fees = collectedRent * input.fee / 100;
  const runningCosts = input.insurance + input.maintenance + input.other;
  const operatingIncome = collectedRent - fees - runningCosts;
  const mortgagePayments = input.mortgage * 12;
  const annualCashFlow = operatingIncome - mortgagePayments;
  return {fullRent, collectedRent, lostRent:fullRent-collectedRent, fees, runningCosts, mortgagePayments, operatingIncome, annualCashFlow, monthlyCashFlow:annualCashFlow/12, grossYield:fullRent/input.value*100, netYield:operatingIncome/input.value*100};
}

export function calculateAffordability(income:number, rent:number, share:number) {
  range(income); range(rent); range(share, 1, 100);
  return {monthlyBudget:income/12*share/100, requiredIncome:rent*12/(share/100), actualShare:income > 0 ? rent*12/income*100 : null};
}

export function calculateMaintenance(repairs:number, servicing:number, target:number, saved:number, months:number) {
  [repairs, servicing, target, saved].forEach(value => range(value));
  range(months, 1, 120);
  if (!Number.isInteger(months)) throw new RangeError('Enter a whole number of months.');
  const reserveGap = Math.max(0, target-saved);
  const monthlyRunning = (repairs+servicing)/12;
  const monthlyReserve = reserveGap/months;
  return {reserveGap, monthlyRunning, monthlyReserve, monthlyTotal:monthlyRunning+monthlyReserve, annualRunning:repairs+servicing};
}
