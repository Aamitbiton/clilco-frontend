import {callAbleFunction} from "../firebase/functions";

export async function send_sms(phoneNumber, userId){
   return await callAbleFunction("send_code_sms", {phoneNumber, userId});
}
export async function check_password(userId, code){
   return await callAbleFunction("check_sms_code", {userId, code});
}