import SidebarUserProfileContainer from "./SidebarUserProfile";
import { default as Container } from "../../components/sidebar/SidebarContainer";
import SidebarButton from "../../components/sidebar/SidebarButton";
import SidebarHeading from "../../components/sidebar/SidebarHeading";
import SidebarSuggestionsContainer from "../../components/sidebar/suggestions/SidebarSuggestionsContainer";
import SidebarSuggestionsHeader from "../../components/sidebar/suggestions/SidebarSuggestionsHeader";
import SidebarSuggestedProfileContainer from "./SidebarSuggestedProfile";
import useProfilesSuggestions from "../../hooks/useProfilesSuggestions";

const SidebarContainer = ({ ...props }) => {
  const { suggestions, loading } = useProfilesSuggestions();
  console.log(suggestions);
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
