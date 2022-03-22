import { App } from "./app";
import {
  collectionGroup,
  onSnapshot,
  orderBy,
  deleteDoc,
  limit,
  updateDoc,
  query,
  where,
  getDocs,
  collection,
  doc,
  setDoc,
  getFirestore,
  addDoc,
  getDoc,
  startAfter,
  arrayUnion,
} from "firebase/firestore";
import { globalFetch } from "src/firebase/functionsFetch";

const db = getFirestore();

async function createDoc(path, data, id) {
  try {
    // creating document with specific id
    if (id) {
      return await setDoc(doc(db, path, id), data);
    }
    // adding document to collection
    else {
      return await addDoc(collection(db, path), data);
    }
  } catch (e) {
    console.log(e);
  }
}

async function getDocument(path) {
  try {
    const myDoc = await getDoc(doc(db, path));
    if (!myDoc) return;
    const data = myDoc.data();
    if (!data) return;
    data.id = myDoc.id;
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function getCollection(path = "", wheres = [], orderBys = [], myLimit = 100, start) {
  try {
    const filter = [
      ...wheres.map((w) => where(w.key, w.operator, w.value)),
      ...orderBys.map((order) => orderBy(...order)),
    ];
    if (start) filter.push(startAfter(start));
    if (myLimit) filter.push(limit(myLimit));
    const q = query(collection(db, path), ...filter);
    const queryDocs = (await getDocs(q)).docs;
    const docs = queryDocs.map((d) => {
      return { ...d.data(), id: d.id };
    });
    return { docs, lastDoc: queryDocs[queryDocs.length - 1] };
  } catch (e) {
    console.error(e);
    globalFetch({
      data: {
        e: e.toString(),
        parameters: { path, wheres, orderBys, myLimit, start },
      },
      name: "alert_errors",
    });
    return { docs: [] };
  }
}

async function update(path, data) {
  try {
    return await updateDoc(doc(db, path), data);
  } catch (e) {
    console.log(e);
  }
}

async function remove(path) {
  return await deleteDoc(doc(db, path));
}

async function watchDoc(path, callBack) {
  return onSnapshot(doc(db, path), callBack);
}

async function watchColl(path, callBack, wheres = []) {
  const q = query(collection(db, path), ...wheres.map((w) => where(w.key, w.operator, w.value)));
  return onSnapshot(q, callBack);
}

async function create_random_id(path) {
  return (await doc(collection(db, path ? path : null))).id;
}

async function add_to_array({ path, prop, val }) {
  await updateDoc(doc(db, path), {
    [prop]: arrayUnion(val),
  });
}

export default {
  createDoc,
  getDocument,
  getCollection,
  update,
  remove,
  watchDoc,
  watchColl,
  create_random_id,
  add_to_array,
};