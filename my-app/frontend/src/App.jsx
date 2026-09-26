import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import RihlaHeader from "./components/Header";
import HomePage from "./pages/HomePage";
import ActivityDetails from "./pages/ActivityDetails";
import Auth from "./pages/Auth "
import ReservationPage from "./pages/ReservationPage"

function AppContent() {
  const location = useLocation();

  const hideHeader = location.pathname === "/auth";

  return (
    <>
      {!hideHeader && <RihlaHeader />}

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/activities/:id"
          element={<ActivityDetails />}
        />

        <Route
          path="/auth"
          element={<Auth />}
        />
        <Route
          path="/activitys/reservations/me"
          element={<ReservationPage />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;