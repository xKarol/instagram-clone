import {
  SidebarSuggestedProfileContainer,
  SidebarSuggestedProfileSkeletonContainer,
} from "./";
import useProfilesSuggestions from "../../hooks/useProfilesSuggestions";

const SidebarSuggestionsListContainer = () => {
  const { data, loading, error } = useProfilesSuggestions();

  if (error) return null;
  return (
    <ul>
      {loading
        ? [...new Array(5)]
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
