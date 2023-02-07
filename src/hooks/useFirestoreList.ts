import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

const db = getFirestore();

export const useFirestoreList = (docName: string) => {
    const _collection = useMemo(() => collection(db, docName), [docName, db]);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        getDocs(_collection).then((data) => {
            setData(
                data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
            );
        });
    }, [_collection]);

    return data;
};
