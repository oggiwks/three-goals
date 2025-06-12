import { getSessionFromCookie } from "@/lib/services/sessions";
import { redirect } from "next/navigation";
import { getGoalSetById } from "@/lib/services/goals";
import notFound from "@/app/not-found";
import { EditGoalsForm } from "@/app/history/[id]/edit/components/edit-goals-form";

type EditGoalsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const EditGoalsPage = async ({ params }: EditGoalsPageProps) => {
  const { id } = await params;
  const { session, user } = await getSessionFromCookie();

  if (!session || !user) {
    redirect("/");
  }

  if (!id) {
    return notFound();
  }

  const goalSet = await getGoalSetById(id, user.id);

  if (!goalSet) {
    return notFound();
  }

  return <EditGoalsForm goalSet={goalSet} userId={user.id} />;
};

export default EditGoalsPage;
