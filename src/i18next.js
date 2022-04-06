import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useTranslation, initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

export const init_i18next = async () => {
  const browser_lng = "en";
  await i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
      supportedLngs: ["en", "he"],
      fallbackLng: "en",
      detection: {
        order: ["cookie"],
        caches: ["cookie"],
      },
      backend: {
        loadPath: "/i18next/locales/{{lng}}/translation.json",
      },
    });
  let t = await i18n.changeLanguage(browser_lng);
  set_direction(browser_lng);
  return t;
};
const set_direction = (lng) => {
  if (lng === "he") {
    document.body.dir = "rtl";
  }
};
const get_browser_lng = () => {
  return window.navigator.language.split("-")[0] || "en";
};
