
import * as dbLayer from '../dbLayer'
import * as authService from '../services/auth'


export async function get_user() {
    const uid = authService.get_current_user()?.uid;
    if (uid) return await dbLayer.get_user(uid)
}
export async function watch_user(callback) {
    const id = authService.get_current_user()?.uid;
    await dbLayer.watch_user({id, callback})
}