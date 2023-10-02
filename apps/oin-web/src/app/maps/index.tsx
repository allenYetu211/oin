/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-26 00:00:55
 * @LastEditTime: 2023-10-02 22:57:09
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-web/src/app/maps/index.tsx
 */
/* eslint-disable-next-line */
import { AMap } from '@oin/maps';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@nextui-org/button';
// import { ObtainLocal } from '@oin/local';
// import useFetch from 'use-http';

export interface MapsProps {}

export function MapsComp(props: MapsProps) {
  const [isRecording, setRecording] = useState<boolean>(false);
  const map = useRef<AMap | undefined>();
  const mapEL = useRef<any>();

  useEffect(() => {
    map.current = new AMap(mapEL.current);
  }, []);

  // const getCurrentLocal = async () => {
  //   const ll = await ObtainLocal();
  //   if (Array.isArray(ll)) {
  //     map.current!.setMapCenter(ll)
  //   }
  // };

  const startRecoding = () => {
    map.current!.startMoveRecord();
    setRecording(true);
  };

  const stopRecoding = () => {
    map.current!.endMoveRecord();
    setRecording(false);
  };

  return (
    <div>
      {!isRecording && <Button onClick={startRecoding}>Record</Button>}
      {isRecording && <Button onClick={stopRecoding}>Stop Record</Button>}

      <Button
        className="ml-5"
        onClick={() => {
          map.current!.drawMapLine();
        }}
      >
        drawMapLine
      </Button>

      <Button
        onClick={() => {
          console.log(map.current!.locationRecord);
        }}
      >
        CONSOLE RECORDING
      </Button>

      <div
        ref={mapEL}
        className="w-full h-screen bg-slate-300 fixed inset-0 -z-10"
      />
    </div>
  );
}
