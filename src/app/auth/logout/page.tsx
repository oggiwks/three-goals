import { getSessionFromCookie } from "@/lib/services/sessions";
import { redirect } from "next/navigation";
import { Logout as LogoutComponent } from "@/app/auth/logout/components/logout";

const Logout = async () => {
  const currentSession = await getSessionFromCookie();

  if (!currentSession.session) {
    redirect("/auth/login");
  }

  return <LogoutComponent sessionToken={currentSession.session.token} />;
};

export default Logout;
