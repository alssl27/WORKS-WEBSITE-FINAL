export function HomeSearch() {
  return (
    <form action="/properties" className="home-search" aria-label="Find a property">
      <fieldset className="search-modes">
        <legend className="sr-only">Buy or rent</legend>
        <label><input type="radio" name="category" value="sale" defaultChecked/><span>Buy</span></label>
        <label><input type="radio" name="category" value="rent"/><span>Rent</span></label>
      </fieldset>
      <div className="home-search-fields">
        <label className="location-field"><span>Where would you like to live?</span><input name="q" placeholder="Enter an area or postcode" maxLength={100}/></label>
        <label><span>Bedrooms</span><select name="bedrooms" defaultValue=""><option value="">Any bedrooms</option>{[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+ bedrooms</option>)}</select></label>
        <button type="submit" className="button">Search properties <span aria-hidden="true">↗</span></button>
      </div>
    </form>
  );
}
