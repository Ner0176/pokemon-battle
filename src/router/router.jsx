import { TeamBuilder, HomeDashboard, BattleArena } from "../components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/team-builder" element={<TeamBuilder />} />
        <Route path="/battle-arena" element={<BattleArena />} />
      </Routes>
    </BrowserRouter>
  );
};
