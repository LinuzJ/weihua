import { useEffect, useRef, useState } from "react";
import pb from "../pocketBase";
import { RecordModel, UnsubscribeFunc } from "pocketbase";

export const useSubscribe = (collection: string) => {
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<RecordModel | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const unsubscribeRef = useRef<UnsubscribeFunc>();

  useEffect(() => {
    if (id !== null) {
      pb.collection(collection)
        .subscribe(id, (event) => {
          setData(event.record);
        })
        .then((unsub) => {
          console.log("sub", id);
          setSubscribed(true);
          unsubscribeRef.current = unsub;
        });
    }

    return () => {
      console.log("unsub", id);
      unsubscribeRef?.current?.();
      setSubscribed(false);
    };
  }, [id, collection]);

  const subscribe = (id: string) => setId(id);
  const unsubscribe = () => {
    unsubscribeRef?.current?.();
  };

  return { data, subscribe, unsubscribe, subscribed };
};
