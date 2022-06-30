import * as dbLayer from "../apiMiddleware/dbLayer";
import * as authService from "../services/auth";
import * as storageLayer from "../apiMiddleware/storageLayer";
import * as api from "../services/api";

export async function get_user_public(id) {
  return await dbLayer.get_user_public(id);
}

export async function watch_user({ privateCallBack, publicCallBack }) {
  const id = authService.get_current_user()?.uid;
  if (id) await dbLayer.watch_user({ id, privateCallBack, publicCallBack });
  else {
    privateCallBack();
    publicCallBack();
  }
}

export function user_id_getter() {
  return authService.get_current_user().uid;
}

export async function send_report(report_data) {
  return api.send_report(report_data);
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

export async function send_contact_form(contactDetails) {
  const id = authService.get_current_user().uid;
  return await api.send_contact_form(contactDetails);
}
