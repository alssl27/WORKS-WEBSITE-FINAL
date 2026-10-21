'use client';

import {useRef, useState} from 'react';
import {Bed, MagnifyingGlass, MapPin} from '@phosphor-icons/react';
import Link from 'next/link';

export function HomeSearch({defaultCategory = 'sale'}: {defaultCategory?: 'rent' | 'sale'}) {
  const [query, setQuery] = useState('');
  const queryInput = useRef<HTMLInputElement>(null);
  return <form action="/properties" className="home-search" aria-label="Search properties">
    <fieldset className="search-modes">
      <legend className="sr-only">Property availability</legend>
      <label><input type="radio" name="category" value="sale" defaultChecked={defaultCategory === 'sale'}/><span>For sale</span></label>
      <label><input type="radio" name="category" value="rent" defaultChecked={defaultCategory === 'rent'}/><span>To rent</span></label>
    </fieldset>
    <div className="home-search-fields">
      <div className="home-query-field"><label className="location-field"><span className="sr-only">Location or postcode</span><MapPin aria-hidden="true" weight="regular"/><input ref={queryInput} name="q" placeholder="Location or postcode" value={query} onChange={event => setQuery(event.target.value)} maxLength={100} autoComplete="postal-code" enterKeyHint="search"/></label>{query && <button type="button" className="search-clear" aria-label="Clear location or postcode" onClick={() => {setQuery(''); queryInput.current?.focus();}}>×</button>}</div>
      <label><span className="sr-only">Minimum bedrooms</span><Bed aria-hidden="true" weight="regular"/><select name="bedrooms" defaultValue=""><option value="">Bedrooms</option>{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+ bedrooms</option>)}</select></label>
      <button type="submit" className="button"><MagnifyingGlass aria-hidden="true" weight="regular"/>Search properties</button>
      <Link href="/valuation" className="button home-valuation-button">Book a valuation</Link>
    </div>
  </form>;
}
