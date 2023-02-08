import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

const db = getFirestore();

export const useFirestoreList = (docName: string) => {
    const _collection = useMemo(() => collection(db, docName), [docName, db]);
    const [data, setData] = useState<any[]>([]);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        getDocs(_collection).then((data) => {
            setData(
                data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
            );
        });
    }, [_collection, update]);

    return { data: data || [], mutate: () => setUpdate(update + 1) };
};
