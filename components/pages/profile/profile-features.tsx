const ProfileFeatures = () => {
  return (
    <div className="flex justify-between items-end py-2">
      <div>
        <h2 className="text-base font-semibold text-gray-900">
          Добро пожаловать в ваш личный кабинет!
        </h2>
        <div className="mt-4 max-w-xl text-sm text-gray-700">
          <p className="text-gray-900">Здесь вы можете:</p>
          <ul className="text-gray-600 mt-2">
            <li className="pl-2 relative before:w-1 before:h-1 before:rounded-full before:bg-gray-200 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2">
              Отслеживать заказы и их статус.
            </li>
            <li className="pl-2 relative before:w-1 before:h-1 before:rounded-full before:bg-gray-200 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2">
              Просматривать историю покупок.
            </li>
            <li className="pl-2 relative before:w-1 before:h-1 before:rounded-full before:bg-gray-200 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2">
              Управлять адресами доставки.
            </li>
            <li className="pl-2 relative before:w-1 before:h-1 before:rounded-full before:bg-gray-200 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2">
              Обновлять личные данные и настройки.
            </li>
            <li className="pl-2 relative before:w-1 before:h-1 before:rounded-full before:bg-gray-200 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2">
              Получать персональные рекомендации.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileFeatures;
