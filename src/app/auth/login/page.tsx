import { getSessionFromCookie } from "@/lib/services/sessions";
import { redirect } from "next/navigation";
import { LoginForm } from "@/app/auth/login/components/login-form";

const LoginPage = async () => {
  const session = await getSessionFromCookie();

  if (session.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-between py-24 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mt-6 mb-6">
        Login to Three Goals
      </h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
