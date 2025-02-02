const SuccessNotification = ({ text }: { text?: string }) => {
  return (
    <div className="text-sm py-1 px-2 rounded-sm bg-green-100 text-green-700 w-full ">
      {text ? text : "Все прекрасно! Поздравляем!"}
    </div>
  );
};

export default SuccessNotification;
