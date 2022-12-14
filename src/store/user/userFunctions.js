import firestore from "../../firebase/firestore";
import APP_CONSTANTS from "../app/constants";
import USER_CONSTANTS from "./constants";
import actionsCreator from "../actionsCreator";
import * as userService from "../../services/user";
import _ from "lodash";
import { store } from "../index";
import { get_all_users } from "../../apiMiddleware/dbLayer";
import { dbPaths } from "../../apiMiddleware/dbLayer/constants";
import { globalFetch } from "../../utils/fetch";
import {
  create_query,
  generate_clilco_users,
  myUser,
  set_tip_top_users,
} from "./utils/tip_top_users";
import { SECOND, check_is_today_date } from "../../utils/dates";
import { create_tracker } from "../../utils/openReplay";

const { getState, dispatch } = store;

export const watch_user = async () => {
  const privateCallBack = async (user) => {
    const user_tracked = getState().app.user_tracked;
    setTimeout(async () => {
      if (user_tracked) return;
      const is_dating_time = getState().video.speed_date_time.its_dating_time;
      await create_tracker(user, is_dating_time);
      await actionsCreator(APP_CONSTANTS.SET_USER_TRACKED, true);
    }, SECOND * 3);
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
  const { docs, lastDoc } = await get_all_users(
    current_last_doc,
    store.getState().user.user.public
  );
  const filter_test_users = docs.filter((user) => !user.testUser);
  const shuffle_users = _.shuffle(filter_test_users);
  //dispatch lastDoc in the state
  await actionsCreator(USER_CONSTANTS.SET_LAST_DOC, lastDoc);
  return shuffle_users;
};

export const get_user_public_data = async (id) => {
  return await userService.get_user_public(id);
};

export const send_contact_form = async (contactDetails) => {
  return await userService.send_contact_form(contactDetails);
};

export const set_user_is_online = async (isOnline, available = false) => {
  const data = {
    isOnline,
    lastSeen: new Date().getTime(),
    available,
  };
  isOnline && delete data.available;
  await userService.update_user_public(data);
};

export const increment_online_users = async () => {
  const user = store.getState().user.user.public;
  const date = JSON.stringify(new Date().setHours(8, 0, 0, 0));
  let lastVisitDay = JSON.parse(localStorage.getItem("last_day_visit_lobby"));
  if (lastVisitDay && check_is_today_date(lastVisitDay)) return;
  localStorage.setItem("last_day_visit_lobby", date);
  await create_today_date_doc(date);
  const gender = user?.gender;
  await userService.increment_online_users(date, gender);
  if (check_is_today_date(user.createdAt))
    await userService.increment_online_users(date, "newUser");
};

//can be replaced with functions that run regularly every beginning of the day
const create_today_date_doc = async (date) => {
  const fullPath = dbPaths.bo_data.count_online_users(date);
  const path = dbPaths.bo_data.lobbyData(date);
  const isDoc = await firestore.getDocument(fullPath, true);
  if (!isDoc) {
    await firestore.createDoc(
      path,
      {
        male: 0,
        female: 0,
        newUsers: 0,
      },
      date
    );
  }
};

export const send_report = async (report_data) => {
  return await userService.send_report(report_data);
};
