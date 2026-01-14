import { Container, CustomButton } from "../base";
import { TeamsPreview } from "./home.content";

export const HomeDashboard = () => {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-10 py-4 h-full">
        <TeamsPreview />
        <div className="flex items-center justify-center">
          <CustomButton
            customStyles={{ fontSize: 18, padding: "24px 40px 24px 40px" }}
          >
            {"Jugar partida"}
          </CustomButton>
        </div>
      </div>
    </Container>
  );
};
