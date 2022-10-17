import {
  SidebarContainer as Container,
  SidebarButton,
  SidebarHeading,
  SidebarSuggestionsContainer,
  SidebarSuggestionsHeader,
} from "../../components/sidebar";
import {
  SidebarUserProfileContainer,
  SidebarSuggestionsListContainer,
} from ".";

const SidebarContainer = ({ ...props }) => {
  return (
    <Container {...props}>
      <SidebarUserProfileContainer />
      <SidebarSuggestionsContainer>
        <SidebarSuggestionsHeader>
          <SidebarHeading>Suggestions For You</SidebarHeading>
          <SidebarButton>See All</SidebarButton>
        </SidebarSuggestionsHeader>
        <SidebarSuggestionsListContainer />
      </SidebarSuggestionsContainer>
    </Container>
  );
};

export default SidebarContainer;
