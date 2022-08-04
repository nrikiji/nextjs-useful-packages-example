import * as React from "react";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children, title = "Page Title" }) => {
  return (
    <>
      <h1>{title}</h1>
      {children}
    </>
  );
};
