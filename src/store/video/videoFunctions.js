import actionsCreator from "../actionsCreator";
import * as videoService from "../../services/video";
import { store } from "../index";
import VIDEO_CONSTANTS from "./constants";
import { send_offer_or_answer, update_me_in_room } from "../../services/video";
import * as faceapi from "face-api.js";

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

export const set_go_to_decision = async () => {
  const room = getState().video.room;
  await videoService.set_go_to_decision({ roomId: room.id });
};

export const end_date = async () => {
  const room = getState().video.room;
  await videoService.end_date({ roomId: room.id });
};

export const get_next_speed_date_time = async () => {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = new Date(tomorrow).setMinutes("00");
  tomorrow = new Date(tomorrow).setSeconds("00");
  const start = new Date(tomorrow).setHours("19");
  const end = new Date(tomorrow).setHours("22");
  const its_dating_time = await check_if_is_date_time(start, end);
  await actionsCreator(VIDEO_CONSTANTS.SET_SPEED_DATE_TIME, {
    start,
    end,
    its_dating_time,
  });
};

const check_if_is_date_time = async (start, end) => {
  start = new Date(start).toString();
  end = new Date(end).toString();
  let currentTime = new Date().toString();
  return (
    start.localeCompare(currentTime) <= 0 && end.localeCompare(currentTime) >= 0
  );
};

export const get_remote_user_data = async (uid) => {
  const remote_user = await videoService.get_remote_user(uid);
  await actionsCreator(VIDEO_CONSTANTS.SET_REMOTE_USER, remote_user);
};

export const emotion_detector = async ({ video, action }) => {
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  ]);
  return setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    const { angry, disgusted, fearful, happy, neutral, sad, surprised } =
      detections[0]?.expressions || {};
    action({ angry, disgusted, fearful, happy, neutral, sad, surprised });
  }, 1000);
};
