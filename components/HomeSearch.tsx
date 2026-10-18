export function HomeSearch({defaultCategory = 'sale'}: {defaultCategory?: 'rent' | 'sale'}) {
  return <form action="/properties" className="home-search" aria-label="Search properties">
    <fieldset className="search-modes"><legend className="sr-only">Search properties to buy or rent</legend><label><input type="radio" name="category" value="sale" defaultChecked={defaultCategory === 'sale'}/><span>Buy</span></label><label><input type="radio" name="category" value="rent" defaultChecked={defaultCategory === 'rent'}/><span>Rent</span></label></fieldset>
    <div className="home-search-fields">
      <label className="location-field"><span className="sr-only">Location or postcode</span><i aria-hidden="true">⌖</i><input name="q" placeholder="Location or postcode" maxLength={100}/></label>
      <label><span className="sr-only">Maximum price</span><i aria-hidden="true">£</i><input name="maxPrice" type="number" min="0" step="1" placeholder="Price"/></label>
      <label><span className="sr-only">Minimum bedrooms</span><i aria-hidden="true">▱</i><select name="bedrooms" defaultValue=""><option value="">Bedrooms</option>{[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+ bedrooms</option>)}</select></label>
      <button type="submit" className="button"><span aria-hidden="true" className="search-icon"/>Search properties</button>
    </div>
  </form>;
}
