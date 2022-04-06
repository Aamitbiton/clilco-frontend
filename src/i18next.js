import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useTranslation, initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

export const init_i18next = async () => {
  const browser_lng = get_browser_lng();
  await i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
      supportedLngs: ["en", "he"],
      fallbackLng: browser_lng,
      detection: {
        order: [
          "cookie",
          "localStorage",
          "sessionStorage",
          "navigator",
          "htmlTag",
          "path",
          "subdomain",
        ],
        caches: ["cookie"],
      },
      backend: {
        loadPath: "/i18next/locales/{{lng}}/translation.json",
      },
    });
  set_direction(browser_lng);
  return i18n.getFixedT();
};
const set_direction = (lng) => {
  if (lng === "he") document.body.dir = "rtl";
};
const get_browser_lng = () => {
  return window.navigator.language.split("-")[0] || "en";
};
