import { makeAutoObservable } from "mobx";
import { fetchMapItems, fetchMapItemsWithLost } from "../api/mapRequests.ts";

class MapStore {
  items: [] = [];
  lostItems: [] = [];
  loading: boolean = false;
  error: null | string = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getMapItems() {
    this.loading = true;
    await fetchMapItems()
      .then((res) => res.json())
      .then((data: []) => {
        this.items = data;
      })
      .catch((error) => {
        this.error = error;
      });
    this.loading = false;
  }

  async getListWithLostItems() {
    this.loading = true;
    await fetchMapItemsWithLost()
      .then((res) => res.json())
      .then((data: []) => {
        this.items = data;
      })
      .catch((error) => {
        this.error = error;
      });
    this.loading = false;
  }

  setListItems(data) {
    this.items = data;
  }

  setLostItems(data) {
    this.lostItems = data;
  }
}

const mapStore = new MapStore();

export default mapStore;
