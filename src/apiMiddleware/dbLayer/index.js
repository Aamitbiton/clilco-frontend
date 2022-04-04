import firestore from "../../firebase/firestore";
import * as constants from "./constants";

export async function get_user(id) {
  return await firestore.getDocument(constants.dbPaths.singleUser(id));
}

export async function watch_user({ id, privateCallBack, publicCallBack }) {
  await firestore.watchDoc(
    constants.dbPaths.singleUser.private(id),
    privateCallBack
  );
  await firestore.watchDoc(
    constants.dbPaths.singleUser.public(id),
    publicCallBack
  );
}

export async function watch_room({ id, callBack }) {
  const wheres = [["userIds", "array-contains", id]];
  return await firestore.watchColl({
    path: constants.dbPaths.rooms,
    callBack,
    wheres,
  });
}

export async function update_user_public({ id, data }) {
  return await firestore.update(constants.dbPaths.singleUser.public(id), data);
}

export async function update_user_private({ id, data }) {
  return await firestore.update(constants.dbPaths.singleUser.private(id), data);
}

export async function get_next_speed_date_time() {
  return await firestore.getDocument(constants.dbPaths.next_speed_date_time);
}