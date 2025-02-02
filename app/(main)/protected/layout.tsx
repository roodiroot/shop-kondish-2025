import BaseContainer from "@/components/general/containers/base-container";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BaseContainer>{children}</BaseContainer>;
}
