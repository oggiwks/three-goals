import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => (
  <div className="flex flex-col gap-4 justify-center items-center py-24">
    <Skeleton className="h-6 mb-4 min-w-[300px]" />
    <Skeleton className="h-4 min-w-[300px]" />
    <Skeleton className="h-4 mb-2 min-w-[300px]" />
    <Skeleton className="h-6 mb-4 min-w-[300px]" />
    <Skeleton className="h-4 min-w-[300px]" />
    <Skeleton className="h-4 min-w-[300px]" />
  </div>
);

export default Loading;
