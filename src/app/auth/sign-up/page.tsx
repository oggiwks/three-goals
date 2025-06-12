import { getSessionFromCookie } from "@/lib/services/sessions";
import { redirect } from "next/navigation";
import { SignUpForm } from "@/app/auth/sign-up/components/sign-up-form";

const SignUpPage = async () => {
  const session = await getSessionFromCookie();

  if (session.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-between py-24 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mt-6 mb-6">
        Sign up for Three Goals
      </h1>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
