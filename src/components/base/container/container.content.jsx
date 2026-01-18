import { mdiCheck } from "@mdi/js";
import { mdiWeb } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "es", label: "Spanish" },
  { code: "en", label: "English" },
];

export const LangSelect = () => {
  const { i18n } = useTranslation();

  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  return (
    <div className="absolute top-3 right-10 z-20">
      <div className="relative">
        <button
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1.25 rounded-full shadow-sm border border-white/50 hover:bg-white transition-all text-neutral-700 hover:text-emerald-600 font-bold text-[10px] xl:text-xs uppercase cursor-pointer"
        >
          <Icon path={mdiWeb} className="size-4" />
          <span>{i18n.language}</span>
        </button>
        {isLangOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            {LANGUAGES.map(({ code, label }) => {
              const isActive = i18n.language === code;
              return (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`flex items-center justify-between px-4 py-2 text-[10px] xl:text-xs font-semibold transition-colors text-left w-full cursor-pointer
                      ${
                        isActive
                          ? "text-emerald-600 bg-emerald-50"
                          : "text-neutral-600 hover:bg-neutral-50"
                      }`}
                >
                  {label}
                  {isActive && (
                    <Icon
                      path={mdiCheck}
                      className="size-3 xl:size-3.5 text-emerald-600"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
