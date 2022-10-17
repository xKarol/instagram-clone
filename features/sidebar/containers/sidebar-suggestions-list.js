import SidebarSuggestedProfileContainer from "./sidebar-suggested-profile";
import { useProfilesSuggestions } from "../hooks";
import { SidebarSuggestedProfileSkeleton } from "../components";

const SidebarSuggestionsListContainer = () => {
  const { data, loading, error } = useProfilesSuggestions();

  if (error) return null;
  return (
    <ul>
      {loading
        ? [...Array.from({ length: 5 })]
            .fill()
            .map((_, index) => <SidebarSuggestedProfileSkeleton key={index} />)
        : data.map((suggestion) => (
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
