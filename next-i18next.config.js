const { initReactI18next } = require("react-i18next");

module.exports = {
  i18n: {
    locales: ["en", "pt-BR"],
    defaultLocale: "en",
  },
  use: [initReactI18next],
};
