import firestore from "../../firebase/firestore";
import * as constants from "./constants";

export async function get_user(id) {
  return await firestore.getDocument(constants.dbPaths.singleUser.public(id));
}

export async function get_all_users(lastDoc) {
  return await firestore.getCollection(
    "public",
    constants.basics_wheres,
    [],
    30,
    lastDoc,
    true
  );
}

export async function get_user_public(id) {
  return await firestore.getDocument(constants.dbPaths.singleUser.public(id));
}

export async function watch_user({ id, privateCallBack, publicCallBack }) {
  await firestore.watchDoc(
    constants.dbPaths.singleUser.public(id),
    publicCallBack
  );

  if (privateCallBack)
    await firestore.watchDoc(
      constants.dbPaths.singleUser.private(id),
      privateCallBack
    );
}

export async function watch_room({ id, callBack }) {
  const wheres_caller = [
    ["caller.id", "==", id],
    ["ended", "!=", true],
  ];
  const unsubscribe_caller = await firestore.watchColl({
    path: constants.dbPaths.rooms,
    callBack,
    wheres: wheres_caller,
  });

  const wheres_answerer = [
    ["answerer.id", "==", id],
    ["ended", "!=", true],
  ];
  const unsubscribe_answerer = await firestore.watchColl({
    path: constants.dbPaths.rooms,
    callBack,
    wheres: wheres_answerer,
  });
  return { unsubscribe_answerer, unsubscribe_caller };
}

export async function get_all_calls({ id, lastDocs }) {
  const { callerLastDoc, answererLastDoc } = lastDocs;
  const wheres_caller = [
    { key: "caller.id", operator: "==", value: id },
    { key: "caller.phone", operator: "!=", value: null },
    { key: "caller.positive", operator: "==", value: true },
    { key: "answerer.positive", operator: "==", value: true },
  ];
  const caller_calls = await firestore.getCollection(
    constants.dbPaths.rooms,
    wheres_caller,
    [["caller.phone"], ["startTime", "desc"]],
    callerLastDoc
  );

  const wheres_answerer = [
    { key: "answerer.id", operator: "==", value: id },
    { key: "answerer.phone", operator: "!=", value: null },
    { key: "caller.positive", operator: "==", value: true },
    { key: "answerer.positive", operator: "==", value: true },
  ];
  const answerer_calls = await firestore.getCollection(
    constants.dbPaths.rooms,
    wheres_answerer,
    [["answerer.phone"], ["startTime", "desc"]],
    answererLastDoc
  );
  return { caller_calls, answerer_calls };
}

export async function update_user_public({ id, data }) {
  return await firestore.update(constants.dbPaths.singleUser.public(id), data);
}

export async function update_user_private({ id, data }) {
  return await firestore.update(constants.dbPaths.singleUser.private(id), data);
}

export async function update_room({ roomId, data }) {
  return await firestore.update(constants.dbPaths.singleRoom(roomId), data);
}
