import { User } from "firebase/auth";
import { ReactNode } from "react";

export default interface DashboardLayoutProps {
  children: ReactNode;
  user: User;
}
