export const { MALE, FEMALE, JEWISH, CHRISTIAN, MUSLIM, ATHEIST } =
  Object.freeze({
    MALE: "male",
    FEMALE: "female",
    CHRISTIAN: "Christian",
    JEWISH: "Jewish",
    MUSLIM: "Muslim",
    ATHEIST: "atheist",
  });

const religion = [
  { value: JEWISH, label: "יהודי" },
  { value: MUSLIM, label: "מוסלמי" },
  { value: CHRISTIAN, label: "נוצרי" },
  { value: ATHEIST, label: "אתאיסט" },
];

const gender = [
  { value: MALE, label: "גבר" },
  { value: FEMALE, label: "אשה" },
];

export { religion, gender };
