export interface Page {
  name: string;
  href: string;
}

export interface CategoriesDataNavigation {
  pages: { name: string; pages?: Page[]; href?: string }[];
}

export const forCastomers: Page[] = [
  { name: "Блог", href: "/blog" },
  { name: "Доставка и оплата", href: "/delivery" },
  // { name: "Акции и скидки", href: "/discounts" },
  { name: "Возврат/обмен товара", href: "/returns" },
  { name: "Публичная оферта", href: "/offer" },
  { name: "Установка и монтаж", href: "/installation" },
  { name: "Установка в домах ПИК", href: "/installation-pik" },
];

export const aboutCompany: Page[] = [
  { name: "О Kondish", href: "/about-kondish" },
  { name: "Контакты", href: "/contacts" },
  { name: "FAQ", href: "/faq" },
  { name: "Гарантия качества", href: "/quality-guarantee" },
  { name: "Установка альпинистом", href: "/installation-climber" },
];

export const navigation: CategoriesDataNavigation = {
  pages: [
    { name: "Покупателям", pages: forCastomers },
    { name: "О компании", pages: aboutCompany },
  ],
};
