import { useState } from "react";
import { LuArrowUpRightSquare } from "react-icons/lu";

import { cityNameInfo } from "@/app/_lib/data";
import { getBuildingInfo } from "@/app/_lib/api";
import { useMapHandle, useMapLocation } from "@/app/_lib/store";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function MapMoveSection() {
  const { openMap } = useMapHandle();
  const { setMapLoc } = useMapLocation();
  const [ city, setCity ] = useState<string>('시/도 선택');
  const [ regionName, setRegionName ] = useState<string>('시/군/구 선택');
  const [ regions, setRegions ] = useState<string[]>([]);
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
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
    openMap();
  }

  // 주소찾기 창 오픈 핸들러
  const openPostHandler = () => {
    setOpenPostcode((prev) => !prev); // 버튼을 재클릭하면 닫힘
  };

  // 주소 선택 후 상태 반영하는 함수
  const selectAddress = (address: AddressParam) => {
    // setValue('address', address.address);
    setOpenPostcode(false);
  };
  
  return (
    <>
      <section className="p-3">
        <article className="flex items-center">
          <div>
            <LuArrowUpRightSquare size="25" color="#4A68F5" />
          </div>
          <div className="text-xl text-default font-bold ml-3">지도 위치 이동{'('}지역단위{')'}</div>
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
      {/* <section className="p-3">
        <article className="flex items-center">
          <div>
            <LuArrowUpRightSquare size="25" color="#4A68F5" />
          </div>
          <div className="text-xl text-default font-bold ml-3">지도 위치 이동{'('}주소단위{')'}</div>
        </article>
        <article className="relative grid grid-cols-4 gap-3 p-5">
          <input
            className="outline-none bg-white-gray px-3 py-2 rounded-lg col-span-3"
            placeholder="주소를 입력해주세요."
            disabled={true}
            // register={{...register('address')}}
          />
          <button
            className="bg-default text-white text-sm rounded-lg"
            type="button"
            onClick={openPostHandler}
          >주소찾기</button>
          {openPostcode && (
            <DaumPostcodeEmbed
              className="absolute top-16 border-[1px] border-black"
              onComplete={selectAddress}
              autoClose={false}
            />
          )}
        </article>
        <article className="px-5">
          <button
            className="bg-default rounded-lg text-white w-full py-3"
            type="button"
            onClick={moveButtonClickHandler}
          >이동</button>
        </article>
      </section> */}
    </>
  );
}

interface AddressParam {
  address: string;
  zonecode: string;
}