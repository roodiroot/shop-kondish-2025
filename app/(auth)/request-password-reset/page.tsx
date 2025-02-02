import AuthFormWrapper from "@/components/general/auth/auth-form-wrapper";
import RequestResetPasswordForm from "@/components/general/auth/forms/request-reset-password-form";
import BaseContainer from "@/components/general/containers/base-container";

const RequestPasswordResetPage = () => {
  return (
    <BaseContainer>
      <AuthFormWrapper
        title="Восстановление пароля"
        description="Введите ваш адрес электронной почты, и мы отправим ссылку для сброса пароля."
        className="mx-auto my-20 lg:my-40"
      >
        <RequestResetPasswordForm />
      </AuthFormWrapper>
    </BaseContainer>
  );
};

export default RequestPasswordResetPage;
