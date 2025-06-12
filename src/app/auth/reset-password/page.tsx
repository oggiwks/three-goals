import { CreatePasswordResetForm } from "@/app/auth/reset-password/components/create-password-reset-form";
import { BackLink } from "@/app/shared/utils/back-link";

const CreatePasswordResetPage = () => (
  <div className="flex flex-col items-center justify-between py-24 px-4 sm:px-6 lg:px-8">
    <div>
      <BackLink />
      <h1 className="text-4xl font-bold text-center mt-6 mb-6">
        Reset your password
      </h1>
      <CreatePasswordResetForm />
    </div>
  </div>
);

export default CreatePasswordResetPage;
