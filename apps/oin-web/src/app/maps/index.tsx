/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-26 00:00:55
 * @LastEditTime: 2023-10-03 18:24:10
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-web/src/app/maps/index.tsx
 */
/* eslint-disable-next-line */
import { AMap } from '@oin/maps';
import { Key, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { convertToTimeFormat } from '@oin/utils';
import * as dayjs from 'dayjs';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Listbox,
  ListboxItem,
} from '@nextui-org/react';

// import { ObtainLocal } from '@oin/local';
// import useFetch from 'use-http';

export interface MapsProps {}

type WalkHistoryProps = { time: number; timer: number; walkRecord: number[][] };

export function MapsComp(props: MapsProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalPlacement, setModalPlacement] = useState('auto');

  const [isRecording, setRecording] = useState<boolean>(false);
  const [recordTimer, setRecordTimer] = useState<number>(0);
  const [walkHistory, setWalkHistory] = useState<WalkHistoryProps[]>([]);
  const currentIntervalId = useRef<NodeJS.Timer>();
  const map = useRef<AMap | undefined>();
  const mapEL = useRef<any>();

  useEffect(() => {
    map.current = new AMap(mapEL.current);
  }, []);

  const timer = useMemo(() => {
    return convertToTimeFormat(recordTimer);
  }, [recordTimer]);

  const currentRecodingState = () => {
    if (!isRecording) {
      map.current!.startMoveRecord();
      setRecording(true);
      currentIntervalId.current = setInterval(() => {
        setRecordTimer((prevState) => prevState + 1);
      }, 1000);
    } else {
      stopRecording();
    }
  };

  const stopRecording = () => {
    if (!currentIntervalId.current) {
      return;
    }

    map.current!.endMoveRecord({
      time: new Date().getTime(),
      timer: recordTimer,
    });
    setRecording(false);
    setRecordTimer(0);
    currentIntervalId.current && clearInterval(currentIntervalId.current);
    currentIntervalId.current = undefined;
  };

  const onLocalHistoryOpen = () => {
    const wh = map.current!.getLocalWalkHistory();

    setWalkHistory(wh);
    onOpen();
  };

  const onHistoryDrawMapLine = (key: Key) => {
    const { walkRecord } = walkHistory[key as number];
    onClose();
    console.log('currentIntervalId.current', currentIntervalId.current);
    stopRecording();
    map.current!.historyDrawMapLine(walkRecord);
  };

  return (
    <>
      <div ref={mapEL} className="h-[60vh]" />

      <div className="h-[40vh] p-2 flex  flex-col space-y-2 rounded-t-lg shadow-lg">
        <Button
          color="primary"
          variant="bordered"
          onClick={currentRecodingState}
        >
          {!isRecording ? 'RECORD' : 'STOP RECORD'}
        </Button>

        <div>RECORDING: {timer}</div>

        <Button color="primary" variant="bordered" onPress={onLocalHistoryOpen}>
          Recoding histroy
        </Button>

        <Modal
          isOpen={isOpen}
          placement={'auto'}
          size="5xl"
          onOpenChange={onOpenChange}
        >
          <ModalContent className="h-[80vh]">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Recording History
                </ModalHeader>
                <ModalBody>
                  {!!walkHistory.length && (
                    <Listbox
                      aria-label="User Menu"
                      onAction={onHistoryDrawMapLine}
                      className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1  overflow-visible shadow-small rounded-medium"
                      itemClasses={{
                        base: 'px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80',
                      }}
                    >
                      {walkHistory.map(
                        (item: WalkHistoryProps, index: number) => (
                          <ListboxItem key={index}>
                            <div className="flex justify-between items-center">
                              <div>
                                {item.time &&
                                  dayjs(item.time).format(
                                    'YYYY-MM-DD HH:mm:ss'
                                  )}
                              </div>
                              <div>
                                Timer: {convertToTimeFormat(item.timer)}
                              </div>
                            </div>
                          </ListboxItem>
                        )
                      )}
                    </Listbox>
                  )}

                  {!walkHistory.length && 'not local walk history record'}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
