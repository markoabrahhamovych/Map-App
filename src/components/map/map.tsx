import { FC, ReactNode } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapPointsInterface } from "../../interfaces";
import L from "leaflet";
import VectorIcon from "../../assets/vector-icon.svg";

const iconPerson = new L.Icon({
  iconUrl: VectorIcon,
  className: "leaflet-div-icon",
});

const MarkersList: FC<{ list: MapPointsInterface[] }> = ({ list = [] }) => {
  return (list || []).map((pos) => (
    <Marker key={pos.id} position={[pos.lat, pos.lng]} icon={iconPerson}>
      <Popup>
        Object ID: {pos.id} <br /> Latitude: {pos.lat.toFixed(5)} <br />{" "}
        Longitude: {pos.lng.toFixed(5)}
      </Popup>
    </Marker>
  ));
};

const MapBlock: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ width: "100%", height: "93vh" }}
    >
      {children}
    </MapContainer>
  );
};

const MapComponent: FC<{ pointsList: MapPointsInterface[] }> = ({
  pointsList = [],
  MarkersComponent = MarkersList,
}) => {
  const mapPointsContainer = <MarkersComponent list={pointsList} />;
  const tileContainer = (
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
  );
  return (
    <MapBlock>
      {tileContainer}
      {mapPointsContainer}
    </MapBlock>
  );
};

export default MapComponent;
