import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const requestData = await req.json();
  const { amount, description, returnUrl } = requestData;

  if (!amount || !description || !returnUrl) {
    return NextResponse.json(
      { error: "Amount, description, and returnUrl are required." },
      { status: 400 }
    );
  }

  const storeId = process.env.YOOKASSA_SHOP_ID; // Идентификатор магазина
  const secretKey = process.env.YOOKASSA_SECRET_KEY; // Секретный ключ

  const idempotenceKey = `${Date.now()}-${Math.random()}`; // Уникальный ключ идемпотентности

  const paymentData = {
    amount: {
      value: amount, // Сумма платежа
      currency: "RUB", // Валюта
    },
    capture: true, // Автоматическое подтверждение платежа
    confirmation: {
      type: "redirect", // Перенаправление пользователя
      return_url: returnUrl, // URL возврата
    },
    description, // Описание платежа
  };

  try {
    const response = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": idempotenceKey, // Идемпотентный ключ
        Authorization: `Basic ${Buffer.from(`${storeId}:${secretKey}`).toString(
          "base64"
        )}`, // Basic Auth
      },
      body: JSON.stringify(paymentData), // Тело запроса
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 }); // Успешный ответ
  } catch (error) {
    console.error("Ошибка создания платежа:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
