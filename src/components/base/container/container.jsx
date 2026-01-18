import Icon from "@mdi/react";
import { showToast } from "../toast";
import { useTranslation } from "react-i18next";
import { tabBox, tabsWrapper } from "./container.styled";
import { useLocation, useNavigate } from "react-router-dom";
import bgForest from "../../../assets/images/background-forest.jpg";
import { mdiPokeball, mdiHomeOutline, mdiSwordCross } from "@mdi/js";

export const Container = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const TABS = [
    { label: "Home", path: "/", icon: mdiHomeOutline },
    { label: "Teams", path: "/team-builder", icon: mdiPokeball },
  ];

  if (location.pathname.includes("battle-arena")) {
    TABS.push({ label: "Battle", path: "/battle-arena", icon: mdiSwordCross });
  }

  const handleClick = (path) => {
    if (location.pathname === path) return;
    !location.pathname.includes("battle-arena")
      ? navigate(path)
      : showToast({
          type: "error",
          text: t("BattleArena.CanNotEscape"),
        });
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgForest})` }}
      className="w-full h-screen bg-cover bg-center relative"
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 w-full h-full border px-10 pt-12 pb-4">
        <div className="relative size-full bg-white/80 rounded-2xl rounded-tl-none px-6 pt-4 shadow-md">
          <div className={tabsWrapper}>
            {TABS.map(({ icon, path, label }, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => handleClick(path)}
                  className={`${tabBox}${
                    location.pathname === path ? "bg-neutral-50" : "bg-white/90"
                  } `}
                >
                  <Icon path={icon} className="size-4" />
                  <span className="text-sm">{t(`Base.Labels.${label}`)}</span>
                </div>
              );
            })}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
