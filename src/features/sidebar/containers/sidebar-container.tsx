import React from "react";
import {
  SidebarButton,
  SidebarContainer as Container,
  SidebarHeading,
  SidebarSuggestionsContainer,
  SidebarSuggestionsHeader,
} from "../components";
import {
  SidebarSuggestionsListContainer,
  SidebarUserProfileContainer,
} from ".";

type Props = React.ComponentProps<typeof Container>;

const SidebarContainer = ({ ...props }: Props) => {
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
