// Словарь для маппинга
const deliveryTypeMapping: Record<string, string> = {
  onDelivery: "Оплата при доставке",
  consultWithManager: "Консультация с менеджером",
};

// Функция для преобразования
export const getDeliveryTypeLabel = (type?: string): string => {
  if (!type) return "Консультация с менеджером";
  return deliveryTypeMapping[type] || "Консультация с менеджером";
};
