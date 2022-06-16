const TIPS = [
  "תגיעו לדייט בלבוש נוח, נעים למראה ולא צועק",
  "לכו לבר או מסעדה אבל לא מקום רועש במיוחד",
  "תגיעו עם חיוך רחב וניצוצות בעיניים",
  "התנהלו בדייט בחופשיות כאילו אתם כבר מכירים",
  "פזרו מחמאות אחד לשני , לא יותר מידי ולא מוגזם",
  "סמנו לדייט שלכם שהוא מוצא חן בעינכם",
  "צחקו מהבדיחות אחד של השני (גם אם לא מצחיק)",
  "בקש לשלם ותציע שהיא אחראית לטיפ",
  "אתם יכולים להתנשק בסיום הדייט , לא חובה",
  "אל תדברו על האקסים שלכם",
  "אל תהפכו את הדייט לראיון עבודה",
  "אל תמהרו לשפוט אחד את השני , תקשיבו",
  "אל תחפרו ותנו מקום לצד השני להטבתה",
  "אל תמהרו להגיע לאינטימיות פיזית",
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
  "אל תאחרו לדייט, קחו בחשבון פקקים וחניה ותגיעו 5 דקות לפני ולא אחרי",
  "הומור שווה המון ובדייט ראשון שווה פי מיליון",
];

const get_random_tip = () => {
  const random_number = Math.floor(Math.random() * TIPS.length);
  const selected_tip = TIPS.find((tip, index) => random_number === index);
  return selected_tip;
};

const before_date = (random_number) => ({
  title: null,
  icon: require("../../../../assets/video_assets/icons/icon_waiting.png"),
  content: [
    message(`
    כרגע נמצאים בדייט 
    3${Math.floor(Math.random() * 8)}
    זוגות`),
    message("הזמן המוערך שלך לדייט הוא 5 דקות"),
  ],
});

export const reject_date = () => ({
  title: "בגלל ריבוי משתמשים כרגע הדייט שלך נדחה",
  icon: require("../../../../assets/video_assets/icons/icon_notice.png"),
  content: [
    message("באפשרותך להמתין או לצאת ואנחנו ניידע אותך בהתרעה להיכנס."),
    message("חשוב ביותר:", true),
    message("מרגע ההודעה רצוי להיכנס מיד כדי לא להפסיד את תורך."),
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
});

const date_tips = (random) => {
  return {
    title: "בינתיים הנה כמה עצות כדי להצליח יותר בעולם ההיכרויות",
    icon: require("../../../../assets/video_assets/icons/icon_tips.png"),
    content: [message(get_random_tip())],
  };
};

function message(message, highlighted = false) {
  return { message, highlighted };
}

const NotesInstances = {
  before_date,
  date_rules,
  date_tips,
};

export default NotesInstances;
