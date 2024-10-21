import { MapPointsInterface } from "../../interfaces";

export const moveObject = (pos: MapPointsInterface) => {
  const speed = 0.0005;
  switch (pos.direction) {
    case "north":
      return { ...pos, lat: pos.lat + speed };
    case "south":
      return { ...pos, lat: pos.lat - speed };
    case "east":
      return { ...pos, lng: pos.lng + speed };
    case "west":
      return { ...pos, lng: pos.lng - speed };
    default:
      return pos;
  }
};
