import { create } from "zustand";

// 지도 중심 위치
export const useMapLocation = create<MapLocState & MapLocAction>((set) => ({
  mapLoc: {
    lat: 37.575184758466044,
    lng: 126.97517453354219
  },
  setMapLoc: (locInfo: MapInfo) => {set({ mapLoc: locInfo })}
}));

// 지도 유무
export const useMapHandle = create<IsMap>((set) => ({
  isMap: false,
  openMap: () => {
    set(() => ({ isMap: true }));
  },
  closeMap: () => {
    set(() => ({ isMap: false }));
  },
  setIsMap: () => {
    set((state) => ({ isMap: !state.isMap }));
  }
}))

// 사이드바 유무
export const useSidebar = create<IsSidebar>((set) => ({
  isSidebar: false,
  openSidebar: () => {
    set(() => ({ isSidebar: true }));
  },
  closeSidebar: () => {
    set(() => ({ isSidebar: false }));
  }
}));

export const useAdmin = create<IsAdminStore>((set) => ({
  isAdmin: false,
  adminLogin: () => {
    set(() => ({ isAdmin: true }));
  },
  adminLogout: () => {
    set(() => ({ isAdmin: false }));
  }
}));


interface MapInfo {
  lat: number;
  lng: number;
}

interface IsMap {
  isMap: boolean;
  openMap: () => void;
  closeMap: () => void;
  setIsMap: () => void;
}

interface IsSidebar {
  isSidebar: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

interface MapLocState {
  mapLoc: MapInfo;
}

interface MapLocAction {
  setMapLoc: (locInfo: MapInfo) => void;
}

interface IsAdminStore {
  isAdmin: boolean;
  adminLogin: () => void;
  adminLogout: () => void;
}