import { Skeleton } from "../../../../components/skeleton";

type Props = React.ComponentPropsWithoutRef<"li">;

const SidebarSuggestedProfileSkeletonContainer = ({ ...props }: Props) => {
  return (
    <li
      className="flex items-center py-[5px]"
      data-testid="suggested-skeleton"
      {...props}
    >
      <Skeleton className="w-[32px] h-[32px] rounded-full mr-[10px]" />
      <div className="flex flex-col">
        <Skeleton className="w-[115px] h-[15px] rounded-[4px] mb-[4px]" />
        <Skeleton className="w-[80px] h-[15px] rounded-[4px]" />
      </div>
    </li>
  );
};

export default SidebarSuggestedProfileSkeletonContainer;
