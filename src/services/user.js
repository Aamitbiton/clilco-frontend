import * as dbLayer from '../dbLayer'
import * as authService from '../services/auth'


export async function get_user() {
    const uid = authService.get_current_user()?.uid;
    if (uid) return await dbLayer.get_user(uid)
}