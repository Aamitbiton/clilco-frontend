import dbLayer from '../dbLayer'
import authService from '../services/auth'


export async function get_user(){
    const id = authService.get_my_id()
    return await dbLayer.get_user(id)
}