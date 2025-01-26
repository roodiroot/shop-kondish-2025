export interface Page {
  name: string;
  href: string;
}

export interface CategoriesDataNavigation {
  pages: Page[];
}

export const navigation: CategoriesDataNavigation = {
  pages: [
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contacts" },
  ],
};
