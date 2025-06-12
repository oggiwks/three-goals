import { getSessionFromCookie } from "@/lib/services/sessions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignUpSuccessPage = async () => {
  const { user } = await getSessionFromCookie();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-between py-24 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mt-6 mb-6">
        Sign up successful!
      </h1>
      <Link href="/auth/login">
        <Button className="mt-6 text-lg cursor-pointer" variant="default">
          Click here to login
        </Button>
      </Link>
    </div>
  );
};

export default SignUpSuccessPage;
