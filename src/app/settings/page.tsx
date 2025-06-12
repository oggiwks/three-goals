import { Settings } from "@/app/settings/components/settings";
import { getSessionFromCookie } from "@/lib/services/sessions";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const { session, user } = await getSessionFromCookie();

  if (!session || !user) {
    redirect("/");
  }

  return <Settings user={user} />;
};

export default SettingsPage;
