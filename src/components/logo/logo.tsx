import { IconButton } from "@mui/material";
import logoUrl from "../../assets/logo.svg";
import { FC } from "react";

const LogoElement: FC = ({ urlPath }: { urlPath: string }) => {
  return (
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <img src={urlPath} alt={"logo"} className={"header-logo"} />
    </IconButton>
  );
};

export const Logo: FC = ({
  LogoComponent = LogoElement,
  linkToLogo = logoUrl,
}: {
  LogoComponent: FC;
  linkToLogo: string;
}) => {
  return <LogoComponent urlPath={linkToLogo} />;
};
