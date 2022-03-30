import * as dbLayer from '../dbLayer'
import * as authService from "./auth";

export async function watch_room(handle_room) {
    const id = authService.get_current_user()?.uid;
    await dbLayer.watch_room({
        id, callBack: (rooms) => {
            handle_room(rooms[0])
        }
    })
}