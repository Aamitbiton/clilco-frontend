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

export async function send_report(report_data) {
  try {
    const res = (await callAbleFunction("report_user", report_data)).data;
    console.log({ res });
    return res;
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

export async function get_rooms_by_date(data) {
  try {
    return (await callAbleFunction("get_rooms_by_current_day", data)).data;
  } catch (e) {
    console.error(e);
    return false;
  }
}
