import * as firestore from "../../firebase/firestore";
import USER_CONSTANTS from "./constants";
import actionsCreator from "../actionsCreator";
import * as userService from "../../services/user";
import { stateParser, store } from "../index";
import APP_CONSTANTS from "../app/constants";
import { get_user_public, update_user_public } from "../../services/user";
import { get_all_users } from "../../apiMiddleware/dbLayer";

const { getState, dispatch } = store;

export const watch_user = async () => {
  const privateCallBack = async (user) => {
    await actionsCreator(USER_CONSTANTS.SET_USER_PRIVATE, user);
    await actionsCreator(APP_CONSTANTS.FINISHED_FETCHING_USER, true);
  };

  const publicCallBack = async (user) => {
    if (user) await actionsCreator(USER_CONSTANTS.SET_USER_PUBLIC, user);
    await actionsCreator(APP_CONSTANTS.FINISHED_FETCHING_USER, true);
  };

  await userService.watch_user({ publicCallBack, privateCallBack });
};

export const handle_user_availability = async (available) => {
  await userService.update_user_public({ available });
};

export const upload_profile_image = async (image) => {
  const imageUploaded = await userService.upload_image(image);
  if (imageUploaded) {
    await actionsCreator(USER_CONSTANTS.SET_IMAGE, { url: image });
  }
  //   const user = stateParser(getState().user.user);
  //   user.public.imgUrl = { url: image };
  //   await actionsCreator(USER_CONSTANTS.SET_USER_PUBLIC, user);
  // }
};

export const set_user_details = async (userDetails) => {
  await userService.update_user_public(userDetails);
};

export const f_get_all_users = async (already_have_users) => {
  console.log(already_have_users);
  let current_last_doc = already_have_users ? getState().user.lastDoc : null;
  const { docs, lastDoc } = await get_all_users(current_last_doc);
  //dispatch lastDoc in the state
  await actionsCreator(USER_CONSTANTS.SET_LAST_DOC, lastDoc);
  return docs;
};

export const get_user_public_data = async (id) => {
  return await userService.get_user_public(id);
};

export const send_contact_form = async (contactDetails) => {
  return await userService.send_contact_form(contactDetails);
};
