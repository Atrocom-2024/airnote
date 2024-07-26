import { useState } from "react";
import { LuArrowUpRightSquare } from "react-icons/lu";

import { cityNameInfo } from "@/app/_lib/data";
import { getBuildingInfo } from "@/app/_lib/api";
import { useMapLocation } from "@/app/_lib/store";

export default function MapMoveSection({ setIsMap }: PropsType) {
  const { setMapLoc } = useMapLocation();
  const [ city, setCity ] = useState<string>('시/도 선택');
  const [ regionName, setRegionName ] = useState<string>('시/군/구 선택');
  const [ regions, setRegions ] = useState<string[]>([]);
  const cityNames = Object.keys(cityNameInfo);

  const cityChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isRegions = Boolean(cityNameInfo[e.target.value]);
    if (isRegions) {
      setRegions(cityNameInfo[e.target.value]);
    } else {
      setRegions([]);
    }
    setCity(e.target.value);
    setRegionName('시/군/구 선택')
  }

  const regionChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionName(e.target.value);
  }

  const moveButtonClickHandler = async () => {
    if (city === '시/도 선택') {
      return alert('시/도를 선택해주세요.');
    } else if (regionName === '시/군/구 선택') {
      return alert('시/군/구를 선택해주세요.');
    }
    const addressInfo = await getBuildingInfo(`${city} ${regionName}`);
    setMapLoc({ lat: addressInfo.documents[0].y, lng: addressInfo.documents[0].x });
    setIsMap(true);
  }
  
  return (
    <section className="p-3">
      <article className="flex items-center">
        <div>
          <LuArrowUpRightSquare size="25" color="#4A68F5" />
        </div>
        <div className="text-xl text-default font-bold ml-3">지도 위치 이동</div>
      </article>
      <article className="grid grid-cols-2 gap-3 p-5">
        <select
          className="outline-none bg-white-gray px-3 py-1 rounded-lg"
          value={city}
          onChange={cityChangeHandler}
        >
          <option>시/도 선택</option>
          {cityNames.map((cityname, idx) => (
            <option key={idx}>{cityname}</option>
          ))}
        </select>
        <select
          className="outline-none bg-white-gray px-3 py-1 rounded-lg"
          value={regionName}
          onChange={regionChangeHandler}
        >
          <option>시/군/구 선택</option>
          {regions.map((region, idx) => (
            <option key={idx}>{region}</option>
          ))}
        </select>
      </article>
      <article className="px-5">
        <button
          className="bg-default rounded-lg text-white w-full py-3"
          type="button"
          onClick={moveButtonClickHandler}
        >이동</button>
      </article>
    </section>
  );
}

interface PropsType {
  setIsMap: React.Dispatch<React.SetStateAction<boolean>>
}