import { TeamBuilder } from "../components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeamBuilder />} />
      </Routes>
    </BrowserRouter>
  );
};
