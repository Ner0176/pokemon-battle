import { TeamBuilder, HomeDashboard } from "../components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/team-builder" element={<TeamBuilder />} />
      </Routes>
    </BrowserRouter>
  );
};
