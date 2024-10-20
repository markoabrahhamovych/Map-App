import { AppBar, Box, Button, Toolbar, Typography, Stack } from "@mui/material";
import logo from "../../assets/logo.svg";
import { FC } from "react";
import { Logo } from "../logo/logo.tsx";
import authStore from "../../stores/authStore.tsx";
import mapStore from "../../stores/mapStore.tsx";

const ActionButtonsContainer = () => {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          mapStore.getListWithLostItems();
        }}
      >
        Get Items With lost connection
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          authStore.logout();
        }}
      >
        Log Out
      </Button>
    </Stack>
  );
};

const Header: FC<{ ActionsButtonsComponent?: FC }> = ({
  ActionsButtonsComponent = ActionButtonsContainer,
}) => {
  const actionBtns = authStore.isAuthenticated && <ActionsButtonsComponent />;

  const tolbarContainer = (
    <Toolbar>
      <Logo linkToLogo={logo} />
      {actionBtns}
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
      ></Typography>
    </Toolbar>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>{tolbarContainer}</AppBar>
    </Box>
  );
};

export default Header;
