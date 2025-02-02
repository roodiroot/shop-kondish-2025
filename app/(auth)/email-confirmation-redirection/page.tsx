import BaseContainer from "@/components/general/containers/base-container";
import SuccessNotification from "@/components/general/notification/success-notification";

const EmailConfirmation = () => {
  return (
    <BaseContainer>
      <div className="py-10">
        <SuccessNotification text="Email успешно подтвержден, спасибо!" />
      </div>
    </BaseContainer>
  );
};

export default EmailConfirmation;
