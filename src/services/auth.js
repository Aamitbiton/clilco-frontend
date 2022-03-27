import *as auth from '../firebase/auth'

export async function login_with_google() {
    return await auth.logInWithProvider('google')
}
export async function login_with_facebook() {
    return await auth.logInWithProvider('facebook')
}

export function get_current_user() {
    return auth.get_current_user()
}