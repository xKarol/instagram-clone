import {
  SidebarSuggestedProfileContainer,
  SidebarSuggestedProfileSkeletonContainer,
} from "./";
import useProfilesSuggestions from "../../hooks/useProfilesSuggestions";

const SidebarSuggestionsListContainer = () => {
  const { suggestions, loading } = useProfilesSuggestions();

  return (
    <ul>
      {loading
        ? [...new Array(5)]
            .fill()
            .map((_, index) => (
              <SidebarSuggestedProfileSkeletonContainer key={index} />
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
