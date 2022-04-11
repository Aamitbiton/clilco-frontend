import actionsCreator from "../actionsCreator";
import * as videoService from "../../services/video";
import { store } from "../index";
import VIDEO_CONSTANTS from "./constants";
import { send_offer_or_answer, update_me_in_room } from "../../services/video";
import { infoLog } from "../../utils/logs";

const { getState, dispatch } = store;

export const watch_room = async () => {
  const unsubscribes = await videoService.watch_room(async (room) => {
    if (room) await actionsCreator(VIDEO_CONSTANTS.SET_ROOM, room);
    // after date consider to delete the room or add parameter to stop listening
    // dont forget to stop watching rooms if not available
  });
  await actionsCreator(VIDEO_CONSTANTS.SET_ROOM_UNSUBSCRIBES, unsubscribes);
};

export const add_offer_or_answer = async ({ offerOrAnswer, roomId, type }) => {
  const { success, error } = await send_offer_or_answer({
    data: { [type]: offerOrAnswer },
    roomId,
    type,
  });
  if (error) await clean_room();
};

export const clean_room = async () => {
  const room = getState().video.room;
  if (!room) return;
  await videoService.clean_room({ room });
};

export const unsubscribe_room_listener = async () => {
  const unsubscribes = getState().video.room_unsubscribes;
  Object.keys(unsubscribes).every((key) => {
    unsubscribes[key]();
  });
};

export const get_next_speed_date_time = async () => {
  const time = await videoService.get_next_speed_date_time();
  if (time?.start)
    await actionsCreator(VIDEO_CONSTANTS.SET_SPEED_DATE_TIME, {
      start: time.start,
      end: time.end,
    });
};

export const get_remote_user_data = async (uid) => {
  const remote_user = await videoService.get_remote_user(uid);
  await actionsCreator(VIDEO_CONSTANTS.SET_REMOTE_USER, remote_user);
};
