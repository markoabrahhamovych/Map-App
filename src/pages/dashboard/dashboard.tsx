import { FC, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./dashboard-style.css";
import mapStore from "../../stores/mapStore.tsx";
import { observer } from "mobx-react-lite";
import { MapPointsInterface } from "../../interfaces";
import { MapComponent, SideBar } from "../../components";
import { moveObject } from "./utils.ts";

const Dashboard: FC = observer(() => {
  const [positions, setPositions] = useState<MapPointsInterface[] | []>([]);

  const onTrackDirections = () => {
    return setInterval(() => {
      setPositions((prevPositions) =>
        (prevPositions || []).map((pos) => moveObject(pos)),
      );
    }, 3000);
  };

  const getListWithMissingItems = ({
    storeList = [],
    stateList = [],
  }: {
    storeList: MapPointsInterface[] | [];
    stateList: MapPointsInterface[] | [];
  }) => {
    const missingItems = (stateList || []).filter(
      (item: MapPointsInterface) =>
        !(storeList || []).some(
          (updatedItem: MapPointsInterface) => updatedItem?.id === item?.id,
        ),
    );
    return missingItems;
  };

  const setMissingItemsToStore = ({
    list = [],
  }: {
    list: MapPointsInterface[];
  }) => {
    mapStore.setLostItems(list);
  };

  const modifyStoreList = ({
    list = [],
  }: {
    list: MapPointsInterface[] | [];
  }) => {
    mapStore.setListItems(list);
  };

  const onUpdateItemsStatuses = ({
    list = [],
  }: {
    list: MapPointsInterface[] | [];
  }) => {
    const updateStatuses = (positions || []).map((item) =>
      (list || []).some(
        (missingItem: MapPointsInterface) => missingItem.id === item.id,
      )
        ? { ...item, status: "In active" }
        : item,
    );
    setPositions(updateStatuses || []);
  };

  const fetchPositions = async () => {
    await mapStore.getMapItems();
  };

  const initListFnc = () => {
    const lostItemsList = getListWithMissingItems({
      storeList: mapStore.items,
      stateList: positions,
    });

    setMissingItemsToStore({ list: lostItemsList || [] });
    onUpdateItemsStatuses({ list: lostItemsList || [] });
    modifyStoreList({ list: positions || [] });
  };

  useEffect(() => {
    if (!mapStore.loading) fetchPositions();
  }, []);

  useEffect(() => {
    if (positions?.length) {
      initListFnc();
    } else {
      setPositions(mapStore.items);
    }
  }, [mapStore.loading]);

  useEffect(() => {
    if (mapStore.lostItems.length) {
      const list = getListWithMissingItems({
        stateList: positions,
        storeList: mapStore.lostItems,
      });

      setTimeout(() => {
        setPositions(list);
        modifyStoreList({ list: positions || [] });
        setMissingItemsToStore({ list: [] });
      }, 300000);
    }
  }, [mapStore.lostItems]);

  useEffect(() => {
    const interval = onTrackDirections();
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <MapComponent pointsList={positions} />
      <SideBar list={positions} />
    </div>
  );
});

export default Dashboard;
