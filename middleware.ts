import { NextRequest, NextResponse } from "next/server";
import { checkTokenJWT } from "./data/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken"); // Получаем токен из cookies

  // Если токена нет, перенаправляем на логин
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Проверка токена через API
  const response = await checkTokenJWT(token.value);

  if (!response.ok) {
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.delete("authToken"); // Удаляем токен из cookies
    res.cookies.delete("userData");
    return res;
  }

  return NextResponse.next(); // Разрешаем доступ к маршруту
}

// Применение middleware к определённым маршрутам
export const config = {
  matcher: ["/protected/:path*"], // Применяется ко всем маршрутам, начинающимся с /protected
};
