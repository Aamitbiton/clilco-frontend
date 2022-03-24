import auth from '../firebase/auth'

export async function login_with_google(){
    return await auth.logInWithGoogle()
}
export async function get_my_id(){

}