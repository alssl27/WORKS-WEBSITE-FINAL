'use client';

import {useRef, useState} from 'react';
import type {PropertyFilter} from '@/lib/property-schema';

export function SearchForm({filters = {}, compact = false}: {filters?: PropertyFilter; compact?: boolean}) {
  const [query, setQuery] = useState(filters.q || '');
  const queryInput = useRef<HTMLInputElement>(null);
  return <form action="/properties" className={compact ? 'search-form compact' : 'search-form'}>
    <label><span className={compact ? 'sr-only' : ''}>Property category</span><select name="category" defaultValue={filters.category || ''}><option value="">All properties</option><option value="rent">Lettings</option><option value="sale">Sales</option><option value="commercial">Commercial</option></select></label>
    <div className="search-query-field"><label><span className={compact ? 'sr-only' : ''}>Area or postcode</span><input ref={queryInput} name="q" placeholder="Area or postcode" value={query} onChange={event => setQuery(event.target.value)} maxLength={100}/></label>{query && <button type="button" className="search-clear" aria-label="Clear area or postcode" onClick={() => {setQuery(''); queryInput.current?.focus();}}>×</button>}</div>
    {!compact && <><label>Minimum bedrooms<select name="bedrooms" defaultValue={filters.bedrooms || ''}><option value="">Any</option>{[1, 2, 3, 4, 5].map(n => <option value={n} key={n}>{n}+</option>)}</select></label><label>Maximum price (£)<input name="maxPrice" type="number" min="0" step="1" placeholder="Any" defaultValue={filters.maxPrice || ''}/></label></>}
    <button className="button" type="submit">Search properties</button>
  </form>;
}
