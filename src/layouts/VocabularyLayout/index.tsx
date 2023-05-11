import { FC } from "react";
import Navigation from "@/components/Navigation";
import DashboardLayoutProps from "./VocabularyLayout.props";
import Container, * as Style from "./VocabularyLayout.style";

const VocabularyLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Container>
      <Style.Content>{children}</Style.Content>
      <Navigation />
    </Container>
  );
};

export default VocabularyLayout;
