import { getSessionFromCookie } from "@/lib/services/sessions";
import { redirect } from "next/navigation";
import { getGoalSetById } from "@/lib/services/goals";
import notFound from "@/app/not-found";
import { ViewGoalsSummary } from "@/app/history/[id]/components/view-goals-summary";

type GoalHistoryByIdPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const GoalHistoryByIdPage = async ({ params }: GoalHistoryByIdPageProps) => {
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

  return <ViewGoalsSummary goalSet={goalSet} userId={user.id} />;
};

export default GoalHistoryByIdPage;
