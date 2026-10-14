'use client';

import {useState} from 'react';
import Link from 'next/link';
import {calculateRental, calculateAffordability, calculateMaintenance} from '@/lib/landlord-tools';

type Tool = 'rental' | 'affordability' | 'maintenance';
type Field = {key:string;label:string;unit:string;min?:number;max?:number;whole?:boolean;hint?:string};
const tools:Record<Tool,{title:string;short:string;description:string;fields:Field[];defaults:Record<string,string>}> = {
  rental: {
    title:'Rental income & yield', short:'Income & yield', description:'See what your property could bring in after vacancy, running costs and mortgage payments.',
    fields:[
      {key:'rent',label:'Monthly rent',unit:'£'},
      {key:'value',label:'Property value',unit:'£',min:1},
      {key:'voidWeeks',label:'Empty weeks per year',unit:'weeks',max:52,hint:'We use a 52-week year to estimate lost rent.'},
      {key:'fee',label:'Management fee',unit:'%',max:100,hint:'Use the total rate including VAT, if applicable. Applied to collected rent; this is not an ABS fee quote.'},
      {key:'mortgage',label:'Monthly mortgage payment',unit:'£',hint:'Include the full payment, including any capital repayment.'},
      {key:'insurance',label:'Annual insurance',unit:'£'},
      {key:'maintenance',label:'Annual maintenance budget',unit:'£'},
      {key:'other',label:'Other annual costs',unit:'£',hint:'For example service charges, licensing and one-off letting costs. Exclude costs already entered.'},
    ],
    defaults:{rent:'1200',value:'200000',voidWeeks:'2',fee:'12',mortgage:'600',insurance:'300',maintenance:'1200',other:'0'},
  },
  affordability: {
    title:'Rent affordability',short:'Affordability',description:'Compare a proposed rent with a household income and a budget percentage you choose.',
    fields:[
      {key:'income',label:'Annual household income before tax',unit:'£'},
      {key:'rent',label:'Proposed monthly rent',unit:'£'},
      {key:'share',label:'Income allocated to rent',unit:'%',min:1,max:100,hint:'30% is an example you can change, not a referencing rule or an ABS eligibility threshold.'},
    ],defaults:{income:'48000',rent:'1200',share:'30'},
  },
  maintenance: {
    title:'Maintenance budget planner',short:'Maintenance budget',description:'Plan for everyday upkeep and build a separate emergency reserve at your own pace.',
    fields:[
      {key:'repairs',label:'Expected annual repairs',unit:'£'},
      {key:'servicing',label:'Annual servicing and inspections',unit:'£'},
      {key:'target',label:'Emergency reserve target',unit:'£'},
      {key:'saved',label:'Already saved for emergencies',unit:'£'},
      {key:'months',label:'Months to build your reserve',unit:'months',min:1,max:120,whole:true},
    ],defaults:{repairs:'1200',servicing:'300',target:'3000',saved:'600',months:'12'},
  },
};
const money = (value:number) => new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:2}).format(value);
const percent = (value:number) => `${value.toFixed(2)}%`;

function ResultRow({label,value}:{label:string;value:string}) {
  return <div><dt>{label}</dt><dd>{value}</dd></div>;
}

function Results({tool,values}:{tool:Tool;values:Record<string,number>}) {
  if (tool === 'rental') {
    const r = calculateRental({rent:values.rent,value:values.value,voidWeeks:values.voidWeeks,fee:values.fee,mortgage:values.mortgage,insurance:values.insurance,maintenance:values.maintenance,other:values.other});
    return <>
      <p className="tool-result-label">Estimated monthly cash flow</p><p className="tool-result-number">{money(r.monthlyCashFlow)}</p><p className="tool-result-caption">After entered costs and mortgage payments, before tax.</p>
      <div className="yield-pair"><div><span>Gross rental yield</span><strong>{percent(r.grossYield)}</strong></div><div><span>Net operating yield</span><strong>{percent(r.netYield)}</strong></div></div>
      <h3>Annual breakdown</h3><dl className="tool-breakdown">
        <ResultRow label="Rent at full occupancy" value={money(r.fullRent)}/><ResultRow label="Less vacancy allowance" value={money(r.lostRent)}/><ResultRow label="Expected rent collected" value={money(r.collectedRent)}/><ResultRow label="Less management fees" value={money(r.fees)}/><ResultRow label="Less running costs & maintenance budget" value={money(r.runningCosts)}/><ResultRow label="Less mortgage payments" value={money(r.mortgagePayments)}/><ResultRow label="Annual cash flow before tax" value={money(r.annualCashFlow)}/>
      </dl>
      {r.annualCashFlow < 0 && <p className="tool-result-note">Your entered costs exceed expected rent. This scenario needs an additional {money(-r.monthlyCashFlow)} per month on average.</p>}
      <details className="tool-method"><summary>How these figures are calculated</summary><p>Collected rent = monthly rent × 12 × (1 − empty weeks ÷ 52). Fees apply only to collected rent. Insurance, maintenance and other costs apply for the full year.</p><p>Gross yield = full-occupancy annual rent ÷ property value × 100. Net operating yield deducts vacancy, fees and running costs, but excludes mortgage payments and tax. Cash flow also deducts all mortgage payments.</p><p>The maintenance budget is treated as money set aside. These figures do not calculate taxable profit, tax relief, purchase costs or capital growth.</p></details>
    </>;
  }
  if (tool === 'affordability') {
    const r = calculateAffordability(values.income,values.rent,values.share);
    return <><p className="tool-result-label">Monthly rent budget at {values.share}%</p><p className="tool-result-number">{money(r.monthlyBudget)}</p><p className="tool-result-caption">Based on the household income and percentage you entered.</p><dl className="tool-breakdown"><ResultRow label="Annual income needed for the proposed rent at this percentage" value={money(r.requiredIncome)}/><ResultRow label="Proposed rent as a share of entered income" value={r.actualShare === null ? 'Not available with zero income' : percent(r.actualShare)}/></dl><p className="tool-result-note">A budgeting comparison only. It does not assess a tenant, approve an application or account for tax, debts and other household spending.</p><details className="tool-method"><summary>How these figures are calculated</summary><p>Monthly budget = annual income ÷ 12 × chosen percentage. Required annual income = monthly rent × 12 ÷ chosen percentage.</p></details></>;
  }
  const r = calculateMaintenance(values.repairs,values.servicing,values.target,values.saved,values.months);
  return <><p className="tool-result-label">Monthly amount to set aside</p><p className="tool-result-number">{money(r.monthlyTotal)}</p><p className="tool-result-caption">For upkeep and reserve savings over the next {values.months} months.</p><dl className="tool-breakdown"><ResultRow label="Monthly repairs & servicing budget" value={money(r.monthlyRunning)}/><ResultRow label="Monthly emergency reserve contribution" value={money(r.monthlyReserve)}/><ResultRow label="Remaining reserve to build" value={money(r.reserveGap)}/><ResultRow label="Annual repairs & servicing budget" value={money(r.annualRunning)}/></dl><p className="tool-result-note">{r.reserveGap === 0 ? 'Your entered savings already cover the reserve target.' : 'This assumes your existing reserve stays untouched while you build it.'} Once the target is reached, the ongoing upkeep budget is {money(r.monthlyRunning)} per month.</p><details className="tool-method"><summary>How these figures are calculated</summary><p>Monthly upkeep = (annual repairs + annual servicing) ÷ 12. Reserve contribution = the remaining savings target ÷ months to save. No interest or inflation is included. Emergency savings are separate from repair spending.</p></details></>;
}

export function LandlordTools({initialTool='rental'}:{initialTool?:Tool}) {
  const [active,setActive] = useState<Tool>(initialTool);
  const [inputs,setInputs] = useState<Record<Tool,Record<string,string>>>(() => ({rental:{...tools.rental.defaults},affordability:{...tools.affordability.defaults},maintenance:{...tools.maintenance.defaults}}));
  const tool = tools[active];
  const values = Object.fromEntries(Object.entries(inputs[active]).map(([key,value]) => [key,Number(value)]));
  const errors = Object.fromEntries(tool.fields.map(field => {
    const raw = inputs[active][field.key];
    const n = values[field.key];
    const min = field.min ?? 0;
    const max = field.max ?? 1e9;
    const error = raw.trim() === '' || !Number.isFinite(n) ? 'Enter a number.' : n < min || n > max ? `Enter a number from ${min.toLocaleString('en-GB')} to ${max.toLocaleString('en-GB')}.` : field.whole && !Number.isInteger(n) ? 'Enter a whole number of months.' : '';
    return [field.key,error];
  }));
  const valid = Object.values(errors).every(error => !error);
  return <div className="landlord-tools">
    <div className="tool-picker" role="group" aria-label="Choose a landlord tool">{(Object.keys(tools) as Tool[]).map(key => <button key={key} type="button" aria-pressed={active === key} aria-controls="calculator-panel" onClick={() => setActive(key)}>{tools[key].short}<span aria-hidden="true">↗</span></button>)}</div>
    <section className="calculator-layout" id="calculator-panel" aria-labelledby="calculator-heading">
      <div className="calculator-inputs"><p className="eyebrow eyebrow-dark">Plan with confidence</p><h2 id="calculator-heading">{tool.title}</h2><p>{tool.description}</p><p className="tool-example">Example figures are filled in to get you started. Replace them with your own. Figures stay on this page and reset when you reload.</p>
        <div className="calculator-fields">{tool.fields.map(field => {
          const id = `${active}-${field.key}`;
          return <div className="calculator-field" key={id}><label htmlFor={id}>{field.label} <span>({field.unit})</span></label><input id={id} type="number" inputMode="decimal" min={field.min ?? 0} max={field.max ?? 1e9} step={field.whole ? '1' : 'any'} required value={inputs[active][field.key]} aria-invalid={Boolean(errors[field.key])} aria-describedby={[field.hint ? `${id}-hint` : '',errors[field.key] ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined} onChange={event => setInputs(previous => ({...previous,[active]:{...previous[active],[field.key]:event.target.value}}))}/>{field.hint && <p id={`${id}-hint`} className="field-hint">{field.hint}</p>}{errors[field.key] && <p id={`${id}-error`} className="field-error">{errors[field.key]}</p>}</div>;
        })}</div>
        <button type="button" className="text-button tool-reset" onClick={() => setInputs(previous => ({...previous,[active]:{...tool.defaults}}))}>Reset to example figures</button>
      </div>
      <aside className="calculator-results" aria-label="Calculation results" aria-live="polite" aria-atomic="true">{valid ? <Results tool={active} values={values}/> : <div className="tool-results-empty"><h3>Check your figures</h3><p>Complete the highlighted fields to see your estimate.</p></div>}<div className="tool-advice"><p>Want a local view on your property?</p><Link href="/valuation" className="button">Request a rental valuation ↗</Link></div></aside>
    </section>
  </div>;
}
