import { getSessionFromCookie } from "@/lib/services/sessions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Book, Check, ThumbsUp } from "lucide-react";

const Home = async () => {
  const { user } = await getSessionFromCookie();

  return (
    <div className="flex flex-col items-center justify-between py-24 px-4 sm:px-6 lg:px-8">
      {user ? (
        <>
          <h1 className="text-4xl font-bold text-center mt-6 mb-6">
            Welcome {user.firstName} {user.lastName}!
          </h1>
          <Link href="/goals">
            <Button className="mt-6 text-lg cursor-pointer" variant="default">
              Set your goals for today
            </Button>
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center mt-6 mb-6">
            Welcome to Three Goals
          </h1>
          <p className="flex gap-2 text-center text-lg mt-4">
            <Book /> The premise is simple: each day, you set three goals for
            yourself to achieve by the end of the day.
          </p>
          <p className="flex gap-2 text-center text-lg mt-4">
            <ThumbsUp /> You can set any goals you like, but they should be
            simple and achievable within a day.
          </p>
          <p className="flex gap-2 text-center text-lg mt-4">
            <Check /> At the end of the day, you can check off the goals you
            have achieved.
          </p>
          <div className="flex items-center space-x-2">
            <Link href="/auth/login">
              <Button className="mt-6 text-lg cursor-pointer" variant="default">
                Login
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button
                className="mt-6 text-lg cursor-pointer"
                variant="secondary"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
