export const saveOrderId = (newOrderId: string) => {
  // Получаем данные из localStorage
  const existingData = localStorage.getItem("orderId");

  let existingOrderIds: string[] = [];

  try {
    // Если данные существуют, пытаемся распарсить их
    if (existingData) {
      existingOrderIds = JSON.parse(existingData);

      // Если данные не являются массивом, преобразуем их в массив
      if (!Array.isArray(existingOrderIds)) {
        console.warn(
          "Данные в localStorage не являются массивом. Перезаписываем."
        );
        existingOrderIds = [existingData]; // Преобразуем строку в массив
      }
    }
  } catch (error) {
    console.error(
      "Ошибка при чтении данных из localStorage. Перезаписываем.",
      error
    );
    existingOrderIds = [];
  }

  // Добавляем новый ID к массиву
  const updatedOrderIds = [...existingOrderIds, newOrderId];

  // Сохраняем массив обратно в localStorage
  localStorage.setItem("orderId", JSON.stringify(updatedOrderIds));
};
