import { getUsersGoalsForToday } from "@/lib/services/goals";
import { TodaysGoals } from "@/app/goals/components/todays-goals";
import { AddGoalsForm } from "@/app/goals/components/add-goals-form";
import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/services/sessions";

export const metadata = {
  title: "Todays goals",
  description: "Your goals for today",
};

const Goals = async () => {
  const { session, user } = await getSessionFromCookie();

  if (!session || !user) {
    redirect("/");
  }

  const todaysGoals = await getUsersGoalsForToday(user.id);

  if (!todaysGoals) {
    return <AddGoalsForm userId={user.id} />;
  }

  return <TodaysGoals goalSet={todaysGoals} userId={user.id} />;
};

export default Goals;
