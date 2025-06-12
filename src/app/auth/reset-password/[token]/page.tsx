import { ResetPasswordForm } from "@/app/auth/reset-password/[token]/components/reset-password-form";
import { BackLink } from "@/app/shared/utils/back-link";

type ResetPasswordPageProps = { params: Promise<{ token: string }> };

const ResetPasswordPage = async ({ params }: ResetPasswordPageProps) => {
  const { token } = await params;
  return (
    <div className="flex flex-col items-center justify-between py-24 px-4 sm:px-6 lg:px-8">
      <div>
        <BackLink />
        <h1 className="text-4xl font-bold text-center mt-6 mb-6">
          Reset your password
        </h1>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
