
export default function FilterLogic(attractions, typeFilter, filterValue, date, activeCategory) {
  return attractions.filter((event) => {
    const nameMatch = event.name?.toLowerCase();
    const dateMatch = date ? event.dates?.start?.localDate === date : true;

    const city = event._embedded?.venues?.[0]?.city?.name?.toLowerCase();
    const classification = event.classifications?.[0]?.segment?.name?.toLowerCase();
    const genre = event.classifications?.[0]?.genre?.name?.toLowerCase();
    const subGenre = event.classifications?.[0]?.subGenre?.name?.toLowerCase();
    const value = filterValue.toLowerCase();

    let filterMatch = true;
    if (filterValue.trim() !== "") {
      switch (typeFilter) {
        case "name":
          filterMatch = nameMatch?.includes(value);
          break;
        case "city":
          filterMatch = city?.includes(value);
          break;
        case "classification":
          filterMatch = classification?.includes(value);
          break;
        case "genre":
          filterMatch = genre?.includes(value);
          break;
        case "subGenre":
          filterMatch = subGenre?.includes(value);
          break;
        default:
          filterMatch = true;
      }
    }

    const categoryMatch = activeCategory === "All" || classification===activeCategory.toLowerCase();

    return filterMatch && dateMatch && categoryMatch;
  });
}
