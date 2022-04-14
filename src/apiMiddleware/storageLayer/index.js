import storage from "../../firebase/storage";
import * as CONSTANTS from "./constants";

export async function uploadImage({ image, id }) {
  const path = CONSTANTS.STORAGE_IMAGE_REF(id);
  return await storage.uploadImgAsString({ image, path });
}

export async function get_question({ index }) {
  const path = CONSTANTS.STORAGE_VIDEO_QUESTION(index);
  return await storage.get_item({ path });
}
