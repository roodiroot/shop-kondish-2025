const NotFoundNotification = ({ text }: { text?: string }) => {
  return (
    <div className="text-sm py-1 px-2 rounded-sm bg-red-100 text-destructive w-full">
      {text ? text : "Не удалось загрузить данные!"}
    </div>
  );
};

export default NotFoundNotification;
