import { Chip, Drawer, List, ListItem, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { MapPointsInterface } from "../../interfaces";

const SideBarWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        top: "64px",
        width: 400,
        flexShrink: 0,
        background: "rgb(9, 11, 11)",
        [`& .MuiDrawer-paper`]: { width: 400, boxSizing: "border-box" },
      }}
    >
      {children}
    </Drawer>
  );
};

const SideBarTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <Typography variant="h6" sx={{ padding: 2 }}>
      {title}
    </Typography>
  );
};

const ItemsList: FC<{ list: MapPointsInterface[] }> = ({ list = [] }) => {
  return (
    <List>
      {(list || []).map((i) => {
        const tipColor: "error" | "success" =
          i?.status == "In active" ? "error" : "success";
        return (
          <ListItem
            key={i.id}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              borderBottom: "1px solid",
            }}
          >
            <h3> Drone {i.id}</h3>
            <p>
              Location: {i.lat.toFixed(5)}, {i.lng.toFixed(5)}
              {i.lat.toFixed(5)}, {i.lng.toFixed(5)}
            </p>
            <p>Direction: {i.direction}</p>
            <div>
              Status:
              <Chip
                label={i?.status || "Active"}
                color={tipColor}
                variant="outlined"
              />
            </div>
          </ListItem>
        );
      })}
    </List>
  );
};

const SideBar: FC<{
  title?: string;
  TitleComponent?: FC;
  list: MapPointsInterface[];
}> = ({ title = "Drone List", TitleComponent = SideBarTitle, list = [] }) => {
  const titleContainer = <TitleComponent title={title} />;
  const listContainer = (
    <List>
      <ItemsList list={list} />
    </List>
  );

  return (
    <SideBarWrapper>
      {titleContainer}
      {listContainer}
    </SideBarWrapper>
  );
};

export default SideBar;
