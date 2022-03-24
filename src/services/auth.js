import *as auth from '../firebase/auth'

export async function login_with_google() {
    return await auth.logInWithGoogle()
}

export function get_current_user() {
    return auth.get_current_user()
}