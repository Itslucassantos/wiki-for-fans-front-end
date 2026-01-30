import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-7xl mx-auto px-16 mt-5">{children}</div>;
}
