import { safeParseJson } from "@/utils/safe-parse-json";
import { cookies } from "next/headers";

export default async function ProtectedPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("userData")?.value;
  const token = cookieStore.get("authToken")?.value;

  const parseUser = safeParseJson(user);

  console.log(token);

  return (
    <div>
      <h1>Email {parseUser.email}</h1>
      <p>username {parseUser.username}</p>
    </div>
  );
}
