import AuthFormWrapper from "@/components/general/auth/auth-form-wrapper";
import ResetPasswordForm from "@/components/general/auth/forms/reset-password-form";
import BaseContainer from "@/components/general/containers/base-container";

type Props = {
  searchParams: Promise<{ code: string }>;
};
const ResetPasswordPage: React.FC<Props> = async ({ searchParams }) => {
  const code = (await searchParams).code;
  // Декодирование URL, если в коде передан еще один URL
  const decodedCode = decodeURIComponent(code);

  return (
    <BaseContainer>
      <AuthFormWrapper
        title="Восстановить пароль"
        description="Введите новый пароль дважды для подтверждения."
        className="mx-auto my-20 lg:my-40"
      >
        <ResetPasswordForm code={decodedCode as string} />
      </AuthFormWrapper>
    </BaseContainer>
  );
};

export default ResetPasswordPage;
