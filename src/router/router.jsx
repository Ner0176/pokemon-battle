import {
  Container,
  TeamBuilder,
  BattleArena,
  HomeDashboard,
} from "../components";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Container>
              <Outlet />
            </Container>
          }
        >
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/team-builder" element={<TeamBuilder />} />
          <Route path="/battle-arena" element={<BattleArena />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
