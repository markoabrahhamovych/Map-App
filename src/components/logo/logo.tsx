import { IconButton } from "@mui/material";
import logoUrl from "../../assets/logo.svg";
import { FC } from "react";

const LogoElement: FC<{ urlPath?: string }> = ({ urlPath }) => {
  return (
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <img src={urlPath} alt={"logo"} className={"header-logo"} />
    </IconButton>
  );
};

export const Logo: FC<{
  LogoComponent?: FC<{ urlPath: string }>;
  linkToLogo?: string;
}> = ({ LogoComponent = LogoElement, linkToLogo = logoUrl ?? "" }) => {
  return <LogoComponent urlPath={linkToLogo} />;
};
