import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/HomePage";
import Auth from "./pages/Auth";
import ActivityDetails from "./pages/ActivityDetails";

import ReservationPage from "./pages/ReservationPage";

import GuideActivities from "./pages/GuideActivities";
import FormCreateActivity from "./pages/FormCreateActivity";
import AdminDashboard from "./pages/AdminDashboard"
import AllUsers from "./pages/AllUser"

import ProtectedRoute from "./components/ProtectedRoute";
import GuideRoute from "./components/GuideRoute";
import AdminRouter from "./components/AdminRouter"

function App() {
  const location = useLocation();

  const hideHeader = location.pathname === "/auth";
  // location.pathname.startsWith("/guide");

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/activitys" element={<Home />} />

        <Route path="/activitys/:id" element={<ActivityDetails />} />

        <Route path="/auth" element={<Auth />} />

        {/* ================= USER ================= */}

        <Route element={<ProtectedRoute />}>
          <Route path="/activities/:id" element={<ActivityDetails />} />
          <Route
            path="/activitys/reservations/me"
            element={<ReservationPage />}
          />
        </Route>

        {/* ================= GUIDE ================= */}

        <Route element={<GuideRoute />}>
          <Route path="/guide/activities" element={<GuideActivities />} />

          <Route
            path="/guide/activities/create"
            element={<FormCreateActivity />}
          />

          <Route
            path="/guide/activities/edit/:id"
            element={<FormCreateActivity />}
          />
        </Route>
        {/* ================= admin ================= */}
        <Route element={<AdminRouter />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/admin/users"
            element={<AllUsers />}
          />
          <Route
            path="/admin/guide"
            element={<FormCreateActivity />}
          />
          <Route
            path="/admin/activities"
            element={<FormCreateActivity />}
          />
          <Route
            path="/admin/reservations"
            element={<FormCreateActivity />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
