const TIPS = [
  "תגיעו לדייט בלבוש נוח, נעים למראה ולא צועק",
  "תגיעו עם חיוך רחב וניצוצות בעיניים",
  "התנהלו בדייט בחופשיות כאילו אתם כבר מכירים",
  "פזרו מחמאות אחד לשני , לא יותר מידי ולא מוגזם",
  "סמנו לדייט שלכם שהוא מוצא חן בעינכם",
  "צחקו מהבדיחות אחד של השני (גם אם לא מצחיק)",
  "בקש לשלם ותציע שהיא אחראית לטיפ",
  "אל תדברו על האקסים שלכם",
  "אל תהפכו את הדייט לראיון עבודה",
  "אל תמהרו לשפוט אחד את השני , תקשיבו",
  "אל תחפרו ותנו מקום לצד השני להטבתה",
  "תתעניינו מה חשוב לצד השני במערכת יחסים",
  "זכרו , לא חייבים לדבר על הכל בדייט ראשון",
  "אל תעשו שום דבר שלא מרגיש לכם בנוח",
  "תהיו אתם, אל תנסו להשוויץ או להתרברב",
  "תקשיבו אחד לשני ותביעו עניין במה שהוא אומר",
  "תנו הזדמנות , אל תחליטו במהירות",
  "שאלו באמת דברים שמעניינים אתכם בלי בושה",
  "אל תלבישו אחד את השני כבר בדמיון בחליפת חתן כלה",
  "אל תנפנפו אחד את השני לשלום ישר על ההתחלה , תנו צ'אנס להכרות",
  "להתמקד לחלוטין במי שמולך, ולא בעצמך",
  "להתמקד בשאלות רק בדברים טובים ומשמחים",
  "הומור שווה המון ובדייט ראשון שווה פי מיליון",
  `הזמן המוערך שלך לדייט הוא ${Math.floor(Math.random() * 8)} דקות`,
];

const get_random_tip = () => {
  const random_number = Math.floor(Math.random() * TIPS.length);
  const selected_tip = TIPS.find((tip, index) => random_number === index);
  return selected_tip;
};

export const reject_date = () => ({
  title: "בגלל עומס גדול של ממתינים לדייט",
  icon: require("../../../../assets/video_assets/icons/icon_notice.png"),
  content: [
    message("מתבצעים כעת כמות גדולה של דייטים והרבה ממתינים"),
    message("יתכן עיכוב במציאת ההתאמה, אנא התעזרו בסבלנות."),
  ],
});

const date_rules = () => ({
  title: "הדייט שלכם יתחיל בקרוב! רק רצינו להזכיר:",
  icon: require("../../../../assets/video_assets/icons/icon_rules.png"),
  content: [
    message("הכנו עבורכם נושאי שיחה מעניינים בלחיצה על כפתור 'השאלה הבאה' "),
    message("ניתן לסיים את הדייט בכל עת בהסכמה חד צדדית."),
    message("חשוב ביותר להתנהג בצורה תרבותית אחד כלפי השני."),
    message("אסור לקלל, להתערטל או להתנהג באגרסיביות."),
    message("תלונה על אדם תשעה אותו אוטומטית."),
    message("בסוף כל דייט, הצלבת טלפונים תתאפשר רק אם שני הצדדים חפצו בכך."),
    message("בהצלחה!", true),
  ],
  sound: require("../../../../assets/sounds/beforeDate.mp3"),
});

const date_tips = (random) => {
  return {
    title: "בינתיים הנה כמה עצות כדי להצליח יותר בעולם ההיכרויות",
    icon: require("../../../../assets/video_assets/icons/icon_tips.png"),
    content: [message(get_random_tip())],
  };
};

const lobby_information_message = () => ({
  title: "",
  icon: require("../../../../assets/video_assets/icons/icon_rules.png"),
  content: [message("לפניך חלק מהמשתמשים שעומדים להיכנס לדייט איתך")],
});

function message(message, highlighted = false) {
  return { message, highlighted };
}

const NotesInstances = {
  date_rules,
  date_tips,
  lobby_information_message,
};

export default NotesInstances;
