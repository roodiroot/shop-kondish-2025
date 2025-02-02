const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

interface OrderData {
  contact?: {
    fullName: string;
    phone: string;
    email: string;
  };
  delivery?: {
    address: string;
  };
  payment?: "onDelivery" | "consultWithManager"; // Перечисление (Enumeration)
  statusPay: "new" | "processing" | "shipped" | "delivered" | "cancelled"; // Перечисление (Enumeration)
  totalPrice: number; // Поле decimal
  products: {
    product: number; // Это ID продукта
    count: number;
  }[];
}

export async function createOrder(orderData: OrderData) {
  if (orderData.products.length)
    try {
      const response = await fetch(API_BASE_URL + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      // Проверяем ответ
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      // Получаем результат
      const data = await response.json();
      return { data, ok: response.ok, status: response.status };
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
}

export interface Order {
  id: number;
  documentId: string;
  delivery: {
    address: string;
  };
  contact: {
    email: string;
    phone: string;
    fullName: string;
  };
  payment?: "onDelivery" | "consultWithManager"; // Перечисление (Enumeration)
  statusPay: "new" | "processing" | "shipped" | "delivered" | "cancelled";
  totalPrice: number;
  createdAt: string; // ISO-строка даты
  updatedAt: string; // ISO-строка даты
  publishedAt: string; // ISO-строка даты
  locale: string | null;
  products: Product[];
}

interface Product {
  name: string;
  slug: string;
  price: number | null;
  count: number; // Хранится как строка
  totalPrice: number;
}

export async function getOrderById(
  documentId: string
): Promise<{ order: Order; ok: boolean; status: number }> {
  if (!documentId) throw new Error("Failed to get order");
  try {
    const response = await fetch(
      API_BASE_URL + `/orders/${documentId}?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Проверяем ответ
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get order");
    }

    // Получаем результат
    const data = await response.json();
    return { order: data, ok: response.ok, status: response.status };
  } catch (error) {
    console.error("Error get order:", error);
    throw error;
  }
}
