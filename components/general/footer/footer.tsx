import BaseContainer from "../containers/base-container";

const Footer = () => {
  return (
    <footer className="py-6 bg-gray-100">
      <BaseContainer>
        <div className="text-center text-xs text-gray-400">
          © 2021-2025 Kondish. Все права защищены.
        </div>
      </BaseContainer>
    </footer>
  );
};

export default Footer;
