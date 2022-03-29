import firestore from '../firebase/firestore'
import * as constants from './constants'

export async function get_user(id) {
    return await firestore.getDocument(constants.dbPaths.singleUser(id))
}

export async function watch_user({id, callBack}) {
    return await firestore.watchDoc(constants.dbPaths.singleUser(id), callBack)
}

export async function watch_room({id, callBack}) {
    const wheres = [["userIds", "array-contains", id]];
    return await firestore.watchColl({path: constants.dbPaths.rooms, callBack, wheres})
}

export async function update_user({id, data}) {
    return await firestore.update(constants.dbPaths.singleUser(id), data)
}