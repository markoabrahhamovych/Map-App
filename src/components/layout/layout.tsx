import { FC, ReactNode } from "react";
import { Header } from "../header";

const LayoutWrapper: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <main
      className={"layout-wr"}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </main>
  );
};

const Layout: FC<{ children?: ReactNode; Wrapper?: FC }> = ({
  children,
  Wrapper = LayoutWrapper,
}) => {
  const header = <Header />;
  return (
    <Wrapper>
      {header}
      {children}
    </Wrapper>
  );
};

export default Layout;
