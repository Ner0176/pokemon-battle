import { useNavigate } from "react-router-dom";
import { Container, CustomButton } from "../base";
import { TeamsPreview } from "./home.content";
import { useTranslation } from "react-i18next";

export const HomeDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container>
      <div className="grid grid-cols-2 gap-10 py-4 h-full">
        <TeamsPreview />
        <div className="flex items-center justify-center">
          <CustomButton
            handleClick={() => navigate("/battle-arena")}
            customStyles={{ fontSize: 18, padding: "24px 40px 24px 40px" }}
          >
            {t("Base.Battle")}
          </CustomButton>
        </div>
      </div>
    </Container>
  );
};
