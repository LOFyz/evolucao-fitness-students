import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

const db = getFirestore();

export const useFirestoreFind = (collectionName: string, id?: string) => {
    const _collection = useMemo(
        () => collection(db, collectionName),
        [collectionName, db]
    );
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (id) {
            const _doc = doc(db, collectionName, id);
            getDoc(_doc).then((_data) => {
                setData({
                    ..._data.data(),
                    id: _data.id,
                });
            });
        }
    }, [_collection]);

    return data;
};
