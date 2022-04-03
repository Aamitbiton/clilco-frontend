import storage from "../../firebase/storage";
import * as CONSTANTS from "./constants";
export async function uploadImage({ image, id }) {
  const path = CONSTANTS.STORAGE_IMAGE_REF(id);
  return await storage.uploadImgAsString({ image, path });
}
