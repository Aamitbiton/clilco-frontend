import { callAbleFunction } from "../firebase/functions";

export async function send_sms(phoneNumber, userId) {
  try {
    return (await callAbleFunction("send_code_sms", { phoneNumber, userId }))
      .data;
  } catch (e) {
    console.error(e);
  }
}
export async function check_password(userId, code) {
  try {
    return (await callAbleFunction("check_sms_code", { userId, code })).data;
  } catch (e) {
    console.error(e);
  }
}
export async function send_contact_form(contact_form_details) {
  try {
    return (await callAbleFunction("contactMessage", { contact_form_details }))
      .data;
  } catch (e) {
    console.error(e);
    return false;
  }
}
export async function search_for_match() {
  try {
    return (await callAbleFunction("search_for_match")).data;
  } catch (e) {
    console.error(e);
  }
}
