import { App } from "./app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
  deleteObject,
} from "firebase/storage";
import { errorLog } from "../utils/logs";

const storage = getStorage(App);
async function uploadImgAsString({ image, path }) {
  const storageRef = ref(storage, path);
  try {
    await uploadString(storageRef, image, "data_url");
    return true;
  } catch (e) {
    errorLog(e);
    return false;
  }
}

async function get_item({ path }) {
  try {
    const storageRef = ref(getStorage(), path);
    return await getDownloadURL(storageRef);
  } catch (e) {
    errorLog(e);
  }
}

export default {
  uploadImgAsString,
  get_item,
};
