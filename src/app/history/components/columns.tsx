import { ColumnDef } from "@tanstack/react-table";
import { GoalSetDto } from "@/lib/data/dto/goals";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";

type GoalsColumnsProps = {
  userId: string;
  handleView: (goalSetId: string) => void;
  handleDelete: (goalSetId: string, userId: string) => Promise<void>;
};

export const useColumns = ({
  userId,
  handleDelete,
  handleView,
}: GoalsColumnsProps): (() => ColumnDef<GoalSetDto>[]) =>
  useCallback(
    () => [
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
          const date = new Date(row.getValue("createdAt"));
          return date.toLocaleDateString();
        },
      },
      {
        accessorKey: "goals",
        header: "Goals",
        cell: ({ row }) => {
          const goals = row.getValue("goals") as GoalSetDto["goals"];
          return (
            <ul>
              {goals.map((goal) => (
                <li className="p-1" key={goal.id}>
                  {goal.description}
                </li>
              ))}
            </ul>
          );
        },
      },
      {
        accessorKey: "finalized",
        header: "Completed",
        cell: ({ row }) => (row.getValue("finalized") ? "Yes" : "No"),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const goalSet = row.original as GoalSetDto;
          return (
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleView(goalSet.id)}
              >
                <Eye />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(goalSet.id, userId)}
              >
                <Trash />
              </Button>
            </div>
          );
        },
      },
    ],
    [userId, handleDelete, handleView],
  );
