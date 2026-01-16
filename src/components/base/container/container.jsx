import Icon from "@mdi/react";
import { useTranslation } from "react-i18next";
import { mdiPokeball, mdiHomeOutline } from "@mdi/js";
import { useLocation, useNavigate } from "react-router-dom";
import bgForest from "../../../assets/images/background-forest.jpg";
import { tabBox, tabsWrapper } from "./container.styled";

const TABS = [
  { label: "Home", path: "/", icon: mdiHomeOutline },
  { label: "Teams", path: "/team-builder", icon: mdiPokeball },
];

export const Container = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

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
                  onClick={() => navigate(path)}
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
