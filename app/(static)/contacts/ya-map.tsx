"use client";

import { YMaps, Map, ZoomControl, Placemark } from "@pbe/react-yandex-maps";
const YaMap = () => {
  return (
    <YMaps
      query={{
        lang: "ru_RU",
      }}
    >
      <div className="absolute inset-0">
        <Map
          className="w-full h-full"
          defaultState={{
            center: [55.706715, 37.66203],
            zoom: 15,
          }}
        >
          <ZoomControl options={{ position: { top: 10, left: 5 } }} />
          <Placemark geometry={[55.706715, 37.66203]} />
        </Map>
      </div>
    </YMaps>
  );
};

export default YaMap;
