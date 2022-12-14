import {
  addDoc,
  arrayUnion,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

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

async function getDocument(path, checkIsDocExists) {
  try {
    const myDoc = await getDoc(doc(db, path));
    if (!myDoc) return;
    if (checkIsDocExists) return myDoc.exists();
    const data = myDoc.data();
    if (!data) return;
    data.id = myDoc.id;
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function getCollection(
  path = "",
  wheres = [],
  orderBys = [],
  myLimit = 100,
  start,
  subCollection = false
) {
  try {
    const filter = [
      ...wheres.map((w) => where(w.key, w.operator, w.value)),
      ...orderBys.map((order) => orderBy(...order)),
    ];
    if (start) filter.push(startAfter(start));
    if (myLimit) filter.push(limit(myLimit));
    const q = subCollection
      ? query(collectionGroup(db, path), ...filter)
      : query(collection(db, path), ...filter);
    const queryDocs = (await getDocs(q)).docs;
    const docs = queryDocs.map((d) => {
      return { ...d.data(), id: d.id };
    });
    return { docs, lastDoc: queryDocs[queryDocs.length - 1] };
  } catch (e) {
    console.error(e);
    return { docs: [] };
  }
}

async function update(path, data) {
  try {
    await updateDoc(doc(db, path), data);
    return { success: true };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}

async function remove(path) {
  try {
    return await deleteDoc(doc(db, path));
  } catch (e) {
    console.log(e);
  }
}

async function incrementField(path, field) {
  try {
    await updateDoc(doc(db, path), { [field]: increment(1) });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}

async function watchDoc(path, callBack) {
  try {
    return onSnapshot(doc(db, path), (userDoc) => {
      callBack(userDoc.data());
    });
  } catch (e) {
    console.log(e);
  }
}

async function watchColl({ path, callBack, wheres = [] }) {
  try {
    const q = query(collection(db, path), ...wheres.map((w) => where(...w)));
    return onSnapshot(q, ({ docs }) => {
      callBack(
        docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  } catch (e) {
    console.log(e);
  }
}

async function getQuery(path) {
  return await query(collection(db, path));
}

async function create_random_id(path) {
  try {
    return (await doc(collection(db, path ? path : null))).id;
  } catch (e) {
    console.log(e);
  }
}
async function add_to_array({ path, prop, val }) {
  try {
    await updateDoc(doc(db, path), {
      [prop]: arrayUnion(val),
    });
  } catch (e) {
    console.log(e);
  }
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
  incrementField,
  getQuery,
  onSnapshot,
};
