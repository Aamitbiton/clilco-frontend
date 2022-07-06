import actionsCreator from "../actionsCreator";
import * as videoService from "../../services/video";
import { store } from "../index";
import VIDEO_CONSTANTS from "./constants";
import { send_offer_or_answer, update_me_in_room } from "../../services/video";
// import * as faceapi from "face-api.js";
import * as api from "../../services/api";

const { getState, dispatch } = store;

export const watch_room = async () => {
  const unsubscribes = await videoService.watch_room(async (room) => {
    if (room) await actionsCreator(VIDEO_CONSTANTS.SET_ROOM, room);
  });
  await actionsCreator(VIDEO_CONSTANTS.SET_ROOM_UNSUBSCRIBES, unsubscribes);
};

export const watch_start_date = async () => {
  const unsubscribe = await videoService.watch_start_date(({ start_date }) => {
    const speed_date_time = { ...getState().video.speed_date_time };
    console.log({ speed_date_time });
    const its_dating_time = speed_date_time.its_dating_time;
    if (its_dating_time && !start_date) {
      get_next_speed_date_time();
    }
  });
};

export const watch_remote_user = async (remoteUserId) => {
  const unsubscribes = await videoService.watch_remote_user(
    remoteUserId,
    async (remoteUser) => {
      if (remoteUser)
        await actionsCreator(
          VIDEO_CONSTANTS.SET_REMOTE_USER_PUBLIC,
          remoteUser
        );
    }
  );
  await actionsCreator(
    VIDEO_CONSTANTS.SET_REMOTE_USER_UNSUBSCRIBES,
    unsubscribes
  );
};

export const search_for_match = async () => {
  return await api.search_for_match();
};

export const delete_room_from_state = async () => {
  await actionsCreator(VIDEO_CONSTANTS.SET_ROOM, null);
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
  Object.keys(unsubscribes).forEach((key) => unsubscribes[key]());
};

export const set_go_to_decision = async () => {
  const room = getState().video.room;
  if (room) await videoService.set_go_to_decision({ roomId: room.id });
};

export const end_date = async () => {
  const room = getState().video.room;
  if (room) await videoService.end_date({ roomId: room.id });
};

export const answer_after_date = async (answer) => {
  try {
    const room = getState().video.room;
    let userId = getState().user.user.private.id;
    if (answer?.positive) answer.phone = getState().user.user.private.phone;
    const type = room?.answerer.id === userId ? "answerer" : "caller";
    await videoService.answer_after_date({ room, type, answer });
  } catch (e) {
    console.log(e);
  }
};

export const get_calls = async () => {
  const lastDocs = getState().video.last_calls_docs;
  const { caller_calls, answerer_calls } = await videoService.get_all_calls({
    lastDocs,
  });
  await actionsCreator(VIDEO_CONSTANTS.SET_LAST_CALLS_DOCS, {
    callerLastDoc: caller_calls.lastDoc,
    answererLastDoc: answerer_calls.lastDoc,
  });
  return [...caller_calls.docs, ...answerer_calls.docs];
};

export const get_next_speed_date_time = async () => {
  let tomorrow = new Date();
  if (check_if_after_date_time()) tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = new Date(tomorrow).setMinutes("00");
  tomorrow = new Date(tomorrow).setSeconds("00");
  const start = new Date(tomorrow).setHours("21"); // todo: 19
  const end = new Date(tomorrow).setHours("22");
  const its_dating_time = await check_if_is_date_time(start, end);
  await actionsCreator(VIDEO_CONSTANTS.SET_SPEED_DATE_TIME, {
    start,
    end,
    its_dating_time,
  });
};

const check_if_after_date_time = () => {
  let currentHour = new Date().getHours();
  return currentHour >= 22;
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

export const get_question_audio = async ({ index }) => {
  return await videoService.get_question_audio({ index });
};

export const set_its_dating_time = async (payload) => {
  await actionsCreator(VIDEO_CONSTANTS.SET_SPEED_DATE_TIME, {
    its_dating_time: payload,
  });
};

// export const emotion_detector = async ({ video, action }) => {
//   await Promise.all([
//     faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//     faceapi.nets.faceExpressionNet.loadFromUri("/models"),
//   ]);
//   return setInterval(async () => {
//     const detections = await faceapi
//       .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//       .withFaceExpressions();
//     const { angry, disgusted, fearful, happy, neutral, sad, surprised } =
//       detections[0]?.expressions || {};
//     action({ angry, disgusted, fearful, happy, neutral, sad, surprised });
//   }, 1000);
// };

export const update_question_in_room = async ({ questions, roomId }) => {
  await videoService.update_question_in_room({ questions, roomId });
};

export const update_reload_counter_in_room = async ({ roomId, value }) => {
  await videoService.update_reload_counter_in_room({ roomId, value });
};

export const update_yourself_in_the_room = async ({
  roomId,
  userId,
  reloaded,
}) => {
  await videoService.update_yourself_in_the_room({ roomId, userId, reloaded });
};
