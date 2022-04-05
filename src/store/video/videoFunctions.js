import actionsCreator from "../actionsCreator";
import * as videoService from "../../services/video";
import { store } from "../index";
import VIDEO_CONSTANTS from "./constants";
import { send_offer } from "../../services/video";

const { getState, dispatch } = store;

export const watch_room = async () => {
  const unsubscribes = await videoService.watch_room(async (room) => {
    if (room) await actionsCreator(VIDEO_CONSTANTS.SET_ROOM, room);
    // after date consider to delete the room or add parameter to stop listening
    // dont forget to stop watching rooms if not available
  });
  await actionsCreator(VIDEO_CONSTANTS.SET_ROOM_UNSUBSCRIBES, unsubscribes);
};

export const add_offer = async ({ offer, roomId, type }) => {
  await send_offer({ data: { [type]: offer }, roomId, type });
};

export const add_answer = async ({ answer, roomId, type }) => {
  await send_offer({ data: { [type]: answer }, roomId, type });
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
  if (time?.milliseconds)
    await actionsCreator(
      VIDEO_CONSTANTS.SET_SPEED_DATE_TIME,
      time.milliseconds
    );
};
