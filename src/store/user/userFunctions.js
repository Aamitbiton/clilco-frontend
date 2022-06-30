import * as firestore from "../../firebase/firestore";
import USER_CONSTANTS from "./constants";
import actionsCreator from "../actionsCreator";
import * as userService from "../../services/user";
import { store } from "../index";
import APP_CONSTANTS from "../app/constants";
import { get_all_users } from "../../apiMiddleware/dbLayer";
import { globalFetch } from "../../utils/fetch";
import {
  create_query,
  generate_clilco_users,
  myUser,
  set_tip_top_users,
} from "./utils/tip_top_users";

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
  const available_time = available ? new Date().getTime() : null;
  await userService.update_user_public({ available, available_time });
};

export const upload_profile_image = async (image) => {
  const imageUploaded = await userService.upload_image(image);
  if (imageUploaded) {
    const temp_image = {
      url: image,
      primary: false,
      id: "1",
      createdAt: new Date(),
    };
    await actionsCreator(USER_CONSTANTS.SET_IMAGE, temp_image);
  }
};

export const set_user_details = async (userDetails) => {
  await userService.update_user_public(userDetails);
};

export const get_tiptop_users = async () => {
  const url =
    "https://us-central1-itserious-6c9dc.cloudfunctions.net/fetchProfiles";
  const clilcoUser = store.getState().user.user.public;
  const filterForQuery = create_query(clilcoUser);
  try {
    const { profiles } = await globalFetch({
      data: {
        filterForQuery,
        matches: [] /*tip_top_users_getter()*/,
        user: myUser(clilcoUser),
      },
      url,
    });
    const real_profiles = profiles.filter((profile) => profile.answers);
    set_tip_top_users(profiles);
    return generate_clilco_users(real_profiles);
  } catch (e) {
    console.log(e);
  }
};

export const f_get_all_users = async (already_have_users, tip_top_users) => {
  if (tip_top_users) {
    return await get_tiptop_users();
  }
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

export const set_user_is_online = async (isOnline, target) => {
  const data = {
    isOnline,
    lastSeen: new Date().getTime(),
    available: false,
  };
  isOnline && delete data.available;
  await userService.update_user_public(data);
};

export const send_report = async (report_data) => {
  return await userService.send_report(report_data);
};
