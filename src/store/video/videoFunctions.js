import actionsCreator from "../actionsCreator";
import * as videoService from "../../services/video";
import { store } from "../index";
import VIDEO_CONSTANTS from "./constants";
import { send_candidate, send_offer } from "../../services/video";

const { getState, dispatch } = store;

export const watch_room = async () => {
  await videoService.watch_room(async (room) => {
    if (room) await actionsCreator(VIDEO_CONSTANTS.SET_ROOM, room);
    //todo: if there is room - start video
    // after date consider to delete the room or add parameter to stop listening
    // maybe user the rooms as יומן שיחות

    // dont forget to stop watching rooms if not available
  });
};

export const add_candidate = async ({ candidate, roomId, type }) => {
  await send_candidate({ candidate, roomId, type });
};

export const add_offer = async ({ offer, roomId, type }) => {
  await send_offer({ data: { [type]: offer }, roomId, type });
};

export const add_answer = async ({ answer, roomId, type }) => {
  await send_offer({ data: { [type]: answer }, roomId, type });
};

export const get_next_speed_date_time = async () => {
  const time = await videoService.get_next_speed_date_time();
  if (time?.milliseconds)
    await actionsCreator(
      VIDEO_CONSTANTS.SET_SPEED_DATE_TIME,
      time.milliseconds
    );
};
