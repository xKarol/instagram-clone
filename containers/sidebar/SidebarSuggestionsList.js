import { SidebarSuggestedProfileContainer } from "./";
import useProfilesSuggestions from "../../hooks/useProfilesSuggestions";
import Skeleton from "../../components/skeleton";

const SidebarSuggestionsListContainer = () => {
  const { suggestions, loading } = useProfilesSuggestions();

  return (
    <ul>
      {loading
        ? new Array(5).fill().map((_, index) => (
            <div className="flex items-center py-[5px]" key={index}>
              <Skeleton className="w-[32px] h-[32px] rounded-full mr-[10px]" />
              <div className="flex flex-col">
                <Skeleton className="w-[115px] h-[15px] rounded-[4px] mb-[4px]" />
                <Skeleton className="w-[80px] h-[15px] rounded-[4px]" />
              </div>
            </div>
          ))
        : suggestions.map((suggestion) => (
            <SidebarSuggestedProfileContainer
              skeleton={loading}
              key={suggestion.docId}
              {...suggestion}
            />
          ))}
    </ul>
  );
};

export default SidebarSuggestionsListContainer;
