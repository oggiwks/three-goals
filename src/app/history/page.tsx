import { getSessionFromCookie } from "@/lib/services/sessions";
import { redirect } from "next/navigation";
import { getAllUserGoalSets } from "@/lib/services/goals";
import { GoalsTable } from "@/app/history/components/goals-table";

const HistoryPage = async () => {
  const { session, user } = await getSessionFromCookie();

  if (!session || !user) {
    redirect("/");
  }

  const goalSets = await getAllUserGoalSets(user.id);

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-24">
      <h1 className="text-4xl font-bold text-center mt-6 mb-6">
        {`${user.firstName} ${user.lastName}'s goals`}
      </h1>
      <p className="text-lg text-center space-y-4">
        Here you can view all your past goals and their completion status.
      </p>

      <GoalsTable data={goalSets} userId={user.id} />
    </div>
  );
};

export default HistoryPage;
