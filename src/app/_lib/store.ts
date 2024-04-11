import { create } from "zustand";

export const useMapLocation = create<MapLocState & MapLocAction>((set) => ({
  mapLoc: {
    lat: 37.575184758466044,
    lng: 126.97517453354219
  },
  setMapLoc: (locInfo: MapInfo) => {set({ mapLoc: locInfo })}
}));


interface MapInfo {
  lat: number;
  lng: number;
}

interface MapLocState {
  mapLoc: MapInfo;
}

interface MapLocAction {
  setMapLoc: (locInfo: MapInfo) => void;
}