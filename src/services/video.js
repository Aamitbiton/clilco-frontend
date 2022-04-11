import * as dbLayer from "../apiMiddleware/dbLayer";
import * as authService from "./auth";

export async function watch_room(handle_room) {
  const id = authService.get_current_user()?.uid;
  return await dbLayer.watch_room({
    id,
    callBack: (rooms) => {
      handle_room(rooms[0]);
    },
  });
}

export async function get_next_speed_date_time() {
  return await dbLayer.get_next_speed_date_time();
}

export async function send_offer_or_answer({ data, roomId }) {
  return await dbLayer.update_room({
    roomId,
    data,
  });
}

export async function clean_room({ room }) {
  return await dbLayer.update_room({
    roomId: room.id,
    data: { answer: null, offer: null },
  });
}

export async function update_me_in_room({ roomId, data }) {
  return await dbLayer.update_room({
    roomId,
    data,
  });
}
