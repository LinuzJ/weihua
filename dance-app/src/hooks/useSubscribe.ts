import { useEffect, useLayoutEffect, useRef, useState } from "react";
import pb from "../pocketBase";
import { RecordModel, RecordSubscription, UnsubscribeFunc } from "pocketbase";

export const useSubscribe = (
  collection: string,
  onData: (e: RecordSubscription<RecordModel>) => void,
) => {
  const [id, setId] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const unsubscribeRef = useRef<UnsubscribeFunc>();
  const cbRef = useRef(onData);

  useLayoutEffect(() => {
    cbRef.current = onData;
  });

  useEffect(() => {
    if (id !== null) {
      pb.collection(collection)
        .subscribe(id, cbRef.current)
        .then((unsub) => {
          console.log("sub", id);
          setSubscribed(true);
          unsubscribeRef.current = unsub;
        });
    }

    return () => {
      console.log("unsub", id);
      unsubscribeRef.current?.();
      setSubscribed(false);
    };
  }, [id, collection]);

  const subscribe = (id: string) => setId(id);
  const unsubscribe = () => {
    unsubscribeRef.current?.();
  };

  return { subscribe, unsubscribe, subscribed };
};
