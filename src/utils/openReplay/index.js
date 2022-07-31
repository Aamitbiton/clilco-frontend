import Tracker from "@openreplay/tracker";
export async function create_tracker(user, is_time_to_record) {
  if (!user) return;
  if (!is_time_to_record) return;
  try {
    const tracker = new Tracker({
      projectKey: "QTiaAnBFRhQYCLVEDedf",
    });
    tracker.setUserID(user.id);
    await tracker.start();
    return true;
  } catch (e) {
    console.error("CREATE_TRACKER_ERROR: ", e);
    return false;
  }
}
