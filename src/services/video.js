import * as dbLayer from "../dbLayer";
import * as authService from "./auth";

export async function watch_room(handle_room) {
  const id = authService.get_current_user()?.uid;
  await dbLayer.watch_room({
    id,
    callBack: (rooms) => {
      handle_room(rooms[0]);
    },
  });
}

export async function get_next_speed_date_time() {
  return await dbLayer.get_next_speed_date_time();
}

export async function send_offer({ data, roomId }) {
  return await dbLayer.update_room({
    roomId,
    data,
  });
}
