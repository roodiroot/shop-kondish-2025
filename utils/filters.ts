type FilterString = string;

// Функция принимает строку URL сайта и и возвращает строку для URL API
export function getFiltersFromQueryString(queryString: string): FilterString {
  // Remove the "?" at the beginning of the string, if present
  const params = new URLSearchParams(
    queryString.startsWith("?") ? queryString.slice(1) : queryString
  );

  let filters: string[] = [];
  let sortFilter: string | null = null;
  const keysWithNull: Set<string> = new Set();
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
    } else if (key === "price") {
      const values = decodeURIComponent(value).split(",");
      if (
        values.length === 2 &&
        !isNaN(Number(values[0])) &&
        !isNaN(Number(values[1]))
      ) {
        filters.push(`filters[price][$gte]=${values[0]}`);
        filters.push(`filters[price][$lte]=${values[1]}`);
      }
    } else {
      // Split the value by comma if it contains multiple elements
      const values = decodeURIComponent(value).split(",");

      // Check if "null" is present among the values
      if (values.includes("null")) {
        keysWithNull.add(key);
        filters.push(`filters[${key}][$notNull]`);
      } else {
        // If there are multiple values, create filters for each
        values.forEach((val, index) => {
          if (!keysWithNull.has(key)) {
            // Ignore if the key is already marked as having "null"
            filters.push(`filters[${key}][${index}]=${val}`);
          }
        });
      }
    }
  }

  // Handle pagination (page and pageSize)
  if (!page) {
    page = "1"; // Default page is 1
  }
  if (!pageSize) {
    pageSize = "12"; // Default pageSize is 12
  }

  // Add pagination filters to the array
  filters.push(`pagination[page]=${page}`);
  filters.push(`pagination[pageSize]=${pageSize}`);

  // If sortFilter is not set, use the default sort
  if (!sortFilter) {
    sortFilter = "sort=popularity:desc";
  }

  // Combine all filters into a string separated by "&"
  return [sortFilter, ...filters].join("&");
}

// Функция возвращает выбранные фильтры
export const getOnFilters = (queryString: string) => {
  const params = new URLSearchParams(
    queryString.startsWith("?") ? queryString.slice(1) : queryString
  );

  const filters = [];

  for (const [key, value] of params.entries()) {
    if (key !== "page" && key !== "sort" && key !== "pageSize") {
      filters.push(key);
    }
  }

  return filters;
};

// Возвращает самую максимальную и минимальную цену в фильтрах
export function findMinMax(arr: (string | null)[]) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }

  // Преобразуем строки в числа, игнорируя null
  const numbers = arr
    .filter((item) => item !== null) // Убираем null
    .map(Number) // Преобразуем строки в числа
    .filter((num) => !isNaN(num)); // Убираем некорректные значения

  if (numbers.length === 0) {
    return null;
  }

  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return [min, max];
}
