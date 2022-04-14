import * as dbLayer from "../apiMiddleware/dbLayer";
import * as authService from "../services/auth";
import * as storageLayer from "../apiMiddleware/storageLayer";

export async function get_user() {
  const uid = authService.get_current_user()?.uid;
  if (uid) return await dbLayer.get_user(uid);
}

export async function watch_user({ privateCallBack, publicCallBack }) {
  const id = authService.get_current_user()?.uid;
  if (id) await dbLayer.watch_user({ id, privateCallBack, publicCallBack });
  else {
    privateCallBack();
    publicCallBack();
  }
}

export async function update_user_public(data) {
  const id = authService.get_current_user()?.uid;
  await dbLayer.update_user_public({ id, data });
}

export async function update_user_private(data) {
  const id = authService.get_current_user()?.uid;
  await dbLayer.update_user_private({ id, data });
}

export async function upload_image(image) {
  const id = authService.get_current_user().uid;
  return await storageLayer.uploadImage({ image, id });
}
