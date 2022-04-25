import * as dbLayer from "../apiMiddleware/dbLayer";
import * as storageLayer from "../apiMiddleware/storageLayer";
import * as authService from "./auth";
import { get_user_public } from "../apiMiddleware/dbLayer";

export async function watch_room(handle_room) {
  const id = authService.get_current_user()?.uid;
  return await dbLayer.watch_room({
    id,
    callBack: (rooms) => {
      handle_room(rooms[0]);
    },
  });
}

export async function send_offer_or_answer({ data, roomId }) {
  return await dbLayer.update_room({
    roomId,
    data,
  });
}

export async function set_go_to_decision({ roomId }) {
  const id = authService.get_current_user()?.uid;
  return await dbLayer.update_room({
    roomId,
    data: { hungUpBy: id, goToDecision: true },
  });
}

export async function end_date({ roomId }) {
  const id = authService.get_current_user()?.uid;
  return await dbLayer.update_room({
    roomId,
    data: { ended: true },
  });
}

export async function answer_after_date({ room, type, answer }) {
  return await dbLayer.update_room({
    roomId: room.id,
    data: { [type]: { ...room[type], ...answer } },
  });
}

export async function clean_room({ room }) {
  return await dbLayer.update_room({
    roomId: room.id,
    data: { answer: null, offer: null },
  });
}

export async function get_remote_user(uid) {
  return await dbLayer.get_user_public(uid);
}

export async function update_question_in_room({ questions, roomId }) {
  return await dbLayer.update_room({ roomId, data: { questions } });
}

export async function update_me_in_room({ roomId, data }) {
  return await dbLayer.update_room({
    roomId,
    data,
  });
}

export async function get_question_audio({ index }) {
  return await storageLayer.get_question({ index });
}

export async function get_all_calls({ lastDocs }) {
  const id = authService.get_current_user()?.uid;
  return await dbLayer.get_all_calls({ id, lastDocs });
}
