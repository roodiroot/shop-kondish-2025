type FilterString = string;

// Функция принимает строку URL сайта и и возвращает строку для URL API
export function getFiltersFromQueryStringForArticle(
  queryString: string,
  pageSizeDefault?: number
): FilterString {
  // Remove the "?" at the beginning of the string, if present
  const params = new URLSearchParams(
    queryString.startsWith("?") ? queryString.slice(1) : queryString
  );

  let filters: string[] = [];
  let sortFilter: string | null = null;
  let page: string | null = null;
  let pageSize: string | null = null;

  // Iterate through all parameter keys and values
  for (const [key, value] of params.entries()) {
    if (key === "sort") {
      const decodedValue = decodeURIComponent(value);
      if (decodedValue === "asc" || decodedValue === "desc") {
        sortFilter = `sort=price:${decodedValue}`;
      }
    } else if (key === "page") {
      page = decodeURIComponent(value);
    } else if (key === "pageSize") {
      pageSize = decodeURIComponent(value);
    }
  }

  // // Убираем товары с available = false
  // filters.push("filters[available]=true");

  // Handle pagination (page and pageSize)
  if (!page) {
    page = "1"; // Default page is 1
  }
  if (!pageSize) {
    pageSize = String(pageSizeDefault) || "12"; // Default pageSize is 12
  }

  // Add pagination filters to the array
  filters.push(`pagination[page]=${page}`);
  filters.push(`pagination[pageSize]=${pageSize}`);

  // If sortFilter is not set, use the default sort
  if (!sortFilter) {
    sortFilter = "sort=createdAt:desc";
  }

  // Combine all filters into a string separated by "&"
  return [sortFilter, ...filters].join("&");
}
