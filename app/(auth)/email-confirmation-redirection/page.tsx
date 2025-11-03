import BaseContainer from "@/components/general/containers/base-container";
import SuccessNotification from "@/components/general/notification/success-notification";
import LoginButton from "@/components/pages/email-confirmation/login-button";

const EmailConfirmation = async () => {
  return (
    <BaseContainer className="h-full">
      <div className="py-10 ">
        <SuccessNotification text="Email успешно подтвержден, спасибо!" />
      </div>
      <div className="mt-1 pb-10 text-center">
        <LoginButton className="text-center" />
      </div>
    </BaseContainer>
  );
};

export default EmailConfirmation;
