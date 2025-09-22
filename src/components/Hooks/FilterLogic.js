
export default function FilterLogic(attractions, typeFilter, filterValue, date, activeCategory) {
  return attractions.filter((event) => {
    const nameFilter = event.name?.toLowerCase();
    const dateFilter = date ? event.date === date : true;

    const venueFilter = event.venue?.toLowerCase();
    const categoryFilter = event.category?.toLowerCase();
    const value = filterValue.toLowerCase();

    let filterMatch = true;
    if (filterValue.trim() !== "") {
      switch (typeFilter) {
        case "name":
          filterMatch = nameFilter?.includes(value);
          break;
        case "city":
          filterMatch = venueFilter?.includes(value);
          break;
        case "classification":
          filterMatch = categoryFilter?.includes(value);
          break;
        default:
          filterMatch = true;
      }
    }

    const categoryMatch = activeCategory === "All" || categoryFilter===activeCategory.toLowerCase();

    return filterMatch && dateFilter && categoryMatch;
  });
}
