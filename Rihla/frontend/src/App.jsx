import "./index.css";

import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/HomePage";
import Auth from "./pages/Auth";
import ActivityDetails from "./pages/ActivityDetails";

import ReservationPage from "./pages/ReservationPage";

import GuideActivities from "./pages/GuideActivities";
import FormCreateActivity from "./pages/FormCreateActivity";
import AdminDashboard from "./pages/AdminDashboard";
import AllUsers from "./pages/AllUser";
import AllGuides from "./pages/AllGuidesPage";
import AdminActivities from "./pages/AdminActivities"
import AdminReservations from "./pages/AdminReservations" 
import CategoriesPage from "./pages/CategoriesPage"
import CreateGuidePage from "./pages/CreateGuidePage"

import ProtectedRoute from "./components/ProtectedRoute";
import GuideRoute from "./components/GuideRoute";
import AdminRouter from "./components/AdminRouter";

function App() {
  const location = useLocation();
console.log("APP PATH:", location.pathname);
  console.log("HIDE HEADER:", location.pathname === "/auth");
  const hideHeader = location.pathname === "/auth";

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
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/guides" element={<AllGuides />} />
          <Route path="/admin/activities" element={<AdminActivities />} />
          <Route path="/admin/reservations" element={<AdminReservations />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/guides/create" element={<CreateGuidePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
