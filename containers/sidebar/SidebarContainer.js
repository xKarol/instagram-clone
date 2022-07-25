import {
  SidebarContainer as Container,
  SidebarButton,
  SidebarHeading,
  SidebarSuggestionsContainer,
  SidebarSuggestionsHeader,
} from "../../components/sidebar";
import {
  SidebarUserProfileContainer,
  SidebarSuggestedProfileContainer,
} from "./";
import useProfilesSuggestions from "../../hooks/useProfilesSuggestions";

const SidebarContainer = ({ ...props }) => {
  const { suggestions, loading } = useProfilesSuggestions();

  return (
    <Container {...props}>
      <SidebarUserProfileContainer />
      <SidebarSuggestionsContainer>
        <SidebarSuggestionsHeader>
          <SidebarHeading>Suggestions For You</SidebarHeading>
          <SidebarButton>See All</SidebarButton>
        </SidebarSuggestionsHeader>
        <ul>
          {suggestions.map((suggestion) => (
            <SidebarSuggestedProfileContainer
              skeleton={loading}
              key={suggestion.docId}
              {...suggestion}
            />
          ))}
        </ul>
      </SidebarSuggestionsContainer>
    </Container>
  );
};

export default SidebarContainer;
