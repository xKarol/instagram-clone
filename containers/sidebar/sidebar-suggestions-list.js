import useProfilesSuggestions from "../../hooks/use-profiles-suggestions";
import {
  SidebarSuggestedProfileContainer,
  SidebarSuggestedProfileSkeletonContainer,
} from ".";

const SidebarSuggestionsListContainer = () => {
  const { data, loading, error } = useProfilesSuggestions();

  if (error) return null;
  return (
    <ul>
      {loading
        ? [...Array.from({ length: 5 })]
            .fill()
            .map((_, index) => (
              <SidebarSuggestedProfileSkeletonContainer key={index} />
            ))
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
