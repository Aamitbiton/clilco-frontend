export const SNACK_BAR_TYPES = {
  REMOTE_USER_LEFT_ROOM: (userName = "המשתמש השני") =>
    `${userName} יצא מהפגישה `,
  REMOTE_USER_JOINED_ROOM: (userName = "המשתמש השני") =>
    `${userName} הצטרף לפגישה `,
  NO_MORE_QUESTIONS: "נגמרו השאלות",
  ANSWER_ACCEPTED: "תגובתך נקלטה בהצלחה",
};
