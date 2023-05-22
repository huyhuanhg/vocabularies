import { FC } from "react";
import Navigation from "@/components/Navigation";
import DashboardLayoutProps from "./VocabularyLayout.props";
import Container, * as Style from "./VocabularyLayout.style";
import Chat from "@/components/Chat";

const VocabularyLayout: FC<DashboardLayoutProps> = ({ children, user }) => {
  return (
    <Container>
      <Style.Content>{children}</Style.Content>
      <Chat
        userName={user.displayName?.replace(/^[\s\w\W]+\s(.+)$/, "$1") || ""}
      />
      <Navigation />
    </Container>
  );
};

export default VocabularyLayout;
