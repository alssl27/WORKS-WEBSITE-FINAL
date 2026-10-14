import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateRental,calculateAffordability,calculateMaintenance} from '../lib/landlord-tools.ts';

const scenario = {rent:1000,value:200000,voidWeeks:0,fee:10,mortgage:500,insurance:300,maintenance:900,other:0};
test('rental cash flow deducts full mortgage payments while operating yield excludes them', () => {
  const r = calculateRental(scenario);
  assert.equal(r.collectedRent,12000); assert.equal(r.fees,1200);
  assert.equal(r.operatingIncome,9600); assert.equal(r.annualCashFlow,3600);
  assert.equal(r.monthlyCashFlow,300); assert.equal(r.grossYield,6); assert.equal(r.netYield,4.8);
});
test('vacancy reduces collected rent and fees but fixed costs continue all year', () => {
  const r = calculateRental({...scenario,voidWeeks:26});
  assert.equal(r.collectedRent,6000); assert.equal(r.fees,600); assert.equal(r.annualCashFlow,-1800);
  const empty = calculateRental({...scenario,voidWeeks:52});
  assert.equal(empty.collectedRent,0); assert.equal(empty.fees,0); assert.equal(empty.annualCashFlow,-7200);
});
test('zero rent and a 100 percent fee produce finite results', () => {
  assert.equal(calculateRental({...scenario,rent:0}).grossYield,0);
  assert.equal(calculateRental({...scenario,fee:100}).annualCashFlow,-7200);
});
test('invalid rental inputs are rejected instead of producing misleading output', () => {
  for (const change of [{rent:-1},{value:0},{fee:101},{voidWeeks:53},{mortgage:NaN},{rent:Infinity}]) assert.throws(() => calculateRental({...scenario,...change}),RangeError);
});
test('affordability respects the chosen ratio and handles zero income', () => {
  assert.deepEqual(calculateAffordability(48000,1200,30),{monthlyBudget:1200,requiredIncome:48000,actualShare:30});
  assert.equal(calculateAffordability(0,1200,30).actualShare,null);
  assert.equal(calculateAffordability(48000,1200,25).requiredIncome,57600);
  assert.throws(() => calculateAffordability(48000,1200,0),RangeError);
});
test('maintenance separates upkeep from savings and never creates a negative savings contribution', () => {
  assert.deepEqual(calculateMaintenance(1200,300,3000,600,12),{reserveGap:2400,monthlyRunning:125,monthlyReserve:200,monthlyTotal:325,annualRunning:1500});
  assert.equal(calculateMaintenance(1200,300,3000,4000,12).monthlyTotal,125);
  for (const months of [0,1.5,121]) assert.throws(() => calculateMaintenance(1200,300,3000,600,months),RangeError);
});
