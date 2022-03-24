import firestore from '../firebase/firestore'

export async function get_user(id) {
    return await firestore.getDocument(constants/id)
}