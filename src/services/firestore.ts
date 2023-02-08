import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";

const db = getFirestore();

export const createFirestoreDoc = async (collectionName: string, data: any) => {
    const _collection = collection(db, collectionName);
    const response = await addDoc(_collection, data);

    return response;
};

export const updateFirestoreDoc = async (
    collectionName: string,
    id: string,
    data: any
) => {
    if (id) {
        const _doc = doc(db, collectionName, id);
        const response = await updateDoc(_doc, data);

        return response;
    } else {
        throw new Error("No id provided");
    }
};

export const deleteFirestoreDoc = async (
    collectionName: string,
    id: string
) => {
    if (id) {
        const _doc = doc(db, collectionName, id);
        const response = await deleteDoc(_doc);

        return response;
    } else {
        throw new Error("No id provided");
    }
};
