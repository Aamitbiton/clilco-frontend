import Tracker from "@openreplay/tracker";

export async function create_tracker(user, is_time_to_record) {
  if (!user) return;
  if (!is_time_to_record) return;

  const tracker = new Tracker({
    projectKey: "QTiaAnBFRhQYCLVEDedf",
  });
  tracker.setUserID(user.id);
  try {
    await tracker.start();
  } catch (e) {
    console.error("CREATE_TRACKER_ERROR: ", e);
  }
}
