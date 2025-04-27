export interface Pagination {
  page: number; // Текущая страница
  pageSize: number; // Количество элементов на странице
  pageCount: number; // Общее количество страниц
  total: number; // Общее количество элементов
}

export interface Meta {
  pagination: Pagination;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface ImageForProduct {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProductCatalog {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  available: boolean | null;
  image?: ImageForProduct | null;
  createdAt: string; // ISO 8601 format date string
  updatedAt: string; // ISO 8601 format date string
  publishedAt: string; // ISO 8601 format date string
}

export interface ProductCatalogData {
  data: ProductCatalog[];
  meta: Meta;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  description: string;
  slug: string;
  available: boolean | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  product_catalog: ProductCatalog;
  brands: Brand[];
}

export interface CategoryData {
  data: Category[];
  meta: Meta;
}

export interface Brand {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  image?: ImageForProduct | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string | null;
  available: boolean | null;
  area_of_room?: string;
  energy_efficiency_class?: string;
  compressor_type?: string;
  noise_level?: string;
  wifi_availability?: string;
  series?: string;
  sale?: number;
  heating_power?: string;
  cooling_power?: string;
  country_of_manufacturer?: string;
  warranty_period?: string;
  refrigerant?: string;
  max_pipe_length?: string | null;
  cooling_capacity?: string | null;
  color?: string;
  price?: string;
  old_price?: string | null;
  popularity?: number;
  images?: ImageForProduct[] | null;
  category?: Category;
  brand?: Brand;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProductsData {
  data: Product[];
  meta: Meta;
}

export interface FilterOption {
  label: string; // Название фильтра
  values: Array<string | null>; // Значения фильтра (массив строк или null)
}

export type FilterData = {
  simpleFilters: SimpleFilters;
  complexFilters: ComplexFilters;
};
export interface ComplexFilters {
  [key: string]: {
    label: string;
    values: Array<{
      value: string | null;
      slug: string;
    }>;
  };
}
export interface SimpleFilters {
  [key: string]: {
    label: string;
    values: (string | null)[];
  };
}

// REVIEWS

export interface Reviews {
  documentId: string;
  author: string;
  grade: number;
  description: string;
  createdAt: string;
}

// ARTICLE
interface MetaArticle {
  pagination: Pagination;
}

export interface ArticleData {
  data: Article[];
  meta: MetaArticle;
}

export interface Article {
  slug: string;
  documentId: string;
  title: string;
  subtitle?: string;
  text?: string;
  label?: string;
  image?: ImageForProduct | null;
  createdAt: string;
}

// QA

export interface QA {
  documentId: string;
  question: string;
  answer?: string;
  link?: string;
}
