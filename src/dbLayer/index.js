import firestore from '../firebase/firestore'
import * as constants from './constants'

export async function get_user(id) {
    return await firestore.getDocument(constants.dbPaths.singleUser(id))
}


export async function watch_user({id,callBack}) {
    return await firestore.watchDoc(constants.dbPaths.singleUser(id),callBack)
}