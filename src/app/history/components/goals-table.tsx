"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GoalSetDto } from "@/lib/data/dto/goals";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useColumns } from "@/app/history/components/columns";
import { useRouter } from "next/navigation";
import { deleteGoalsAction } from "../actions";
import { toast } from "sonner";

type GoalsTableProps = {
  data: GoalSetDto[];
  userId: string;
};

export const GoalsTable = ({ data, userId }: GoalsTableProps) => {
  const router = useRouter();

  const handleView = (goalSetId: string): void => {
    router.push(`/history/${goalSetId}`);
  };

  const handleDelete = async (
    goalSetId: string,
    userId: string,
  ): Promise<void> => {
    try {
      await deleteGoalsAction(goalSetId, userId);
      toast.success("Goals deleted successfully", {
        style: {
          color: "oklch(0.985 0 0)",
          background: "green",
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred while deleting these goals", {
        style: {
          color: "oklch(0.985 0 0)",
          background: "red",
        },
      });
    }
  };

  const columns = useColumns({
    userId,
    handleDelete,
    handleView,
  })();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">No goals found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border grid grid-cols-1 max-w-[350px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length
            ? table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};
