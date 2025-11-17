import { NextResponse } from "next/server";

import { getAllProducts } from "@/data/product-api";
import { getAllProductCatalog } from "@/data/catalog-api";
import { getAllCategory } from "@/data/category-api";

export async function GET() {
  const paramProduct = new URLSearchParams({
    "pagination[pageSize]": "10000",
    populate: "*",
  });
  const products = await getAllProducts(paramProduct.toString());
  const catalog = await getAllProductCatalog();
  const categories = await getAllCategory();

  const yml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <yml_catalog date="${new Date()
    .toISOString()
    .slice(0, 16)
    .replace("T", " ")}">
    <shop>
        <name>KONDISH</name>
        <company>Kondish</company>
        <url>${process.env.NEXT_PUBLIC_URL}</url>
        <categories>
          ${catalog?.data
            .map((type) => {
              return `<category id="${type.id}" >${type.name}</category> 
              `;
            })
            .join("")}
          ${categories?.data
            .map((category) => {
              return `<category parentId="${category.product_catalog.id}" id="${category.id}">${category.name}</category> 
              `;
            })
            .join("")}
        </categories>
        <offers>
        ${products?.data
          .map((p) => {
            if (!p.available) return;
            const params = [
              p.area_of_room
                ? `<param name="Площадь помещения до м²:">${p.area_of_room}</param>`
                : "",
              p.compressor_type
                ? `<param name="Технология компрессора:">${p.compressor_type}</param>`
                : "",
              p.wifi_availability
                ? `<param name="Наличие Wi-Fi:">${p.wifi_availability}</param>`
                : "",
              p.cooling_capacity
                ? `<param name="Охлаждающая способность, BTU:">${p.cooling_capacity}</param>`
                : "",
              p.noise_level
                ? `<param name="Уровень шума, дБ:">${p.noise_level}</param>`
                : "",
              p.color ? `<param name="Цвет:">${p.color}</param>` : "",
              p.energy_efficiency_class
                ? `<param name="Класс энергоэффективности:">${p.energy_efficiency_class}</param>`
                : "",
              p.country_of_manufacturer
                ? `<param name="Страна производитель:">${p.country_of_manufacturer}</param>`
                : "",
              p.warranty_period
                ? `<param name="Гарантия:">${p.warranty_period}</param>`
                : "",
            ]
              .filter(Boolean)
              .join("");
            return `
              <offer id="${p.id}" available="${p.available}">
                <name>${
                  p.category?.name + " " + p.brand?.name + " " + p.name
                }</name>
                <url>${process.env.NEXT_PUBLIC_URL}product/${p.slug}</url>
                ${p.images
                  ?.map(
                    (i) =>
                      `<picture>${process.env.NEXT_PUBLIC_API_BASE_URL}${i.url}</picture>`
                  )
                  .join("")}
                <price>${p.price}</price>
                ${
                  p.sale
                    ? `<oldprice>${
                        p.sale
                          ? `${
                              (Number(p.price) || 0) * (Number(p.sale) / 100) +
                              (Number(p.price) || 0)
                            }`
                          : p.price
                      }</oldprice>`
                    : ""
                }
                <currencyId>RUR</currencyId>
                <categoryId>${p.category?.id}</categoryId>
                <typePrefix>${p.category?.name}</typePrefix>
                <model>${p.name}</model>
                <vendor>${p.brand?.name}</vendor>
                <description>${p.description}</description>
                <sales_notes>Скидка 10% на первую покупку. Привезем и установим сегодня.</sales_notes>
                ${params}
            </offer>`;
          })
          .join("")}
        </offers>
    </shop>
  </yml_catalog>
  `;

  return new NextResponse(yml.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
