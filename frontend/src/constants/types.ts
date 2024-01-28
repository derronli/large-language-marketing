import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export type Action = {
  name: string;
  label: string;
  action: (input: any) => void;
  variant: string;
  disabled?: boolean;
};
