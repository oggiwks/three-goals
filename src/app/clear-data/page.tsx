import { getSessionFromCookie } from "@/lib/services/sessions";
import { redirect } from "next/navigation";
import { ClearData } from "@/app/clear-data/components/clear-data";

const ClearDataPage = async () => {
  const { session, user } = await getSessionFromCookie();

  if (!session || !user) {
    redirect("/");
  }

  return <ClearData userId={user.id} />;
};

export default ClearDataPage;
