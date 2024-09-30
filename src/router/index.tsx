import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import {
  ADMIN_LOGIN_PATH,
  ADMIN_PATH,
  ADMIN_REGISTRATION_LISTING_PATH,
  BASE_PATH,
  NOT_FOUND_PATH,
} from "../constants/paths";
import ProtectedRoute from "../providers/protected-route";
import RegistrationForInterest from "../pages/registration-for-interest";
import InternalWrapper from "../providers/internal-wrapper";
import RegistrationListing from "../pages/registration-listing";
import AdminLogin from "../pages/admin-login";
import { useEffect, useState } from "react";
import { getSession } from "../apis/auth";
import { Spin } from "antd";

const Router = () => {
  const [session, setSession] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        setSession(session);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return loading ? (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" />
    </main>
  ) : (
    <Routes>
      <Route
        path={ADMIN_LOGIN_PATH}
        element={<AdminLogin session={session} setSession={setSession} />}
      />
      <Route
        path={NOT_FOUND_PATH}
        element={
          <main
            style={{
              width: "100%",
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            404 | The page you requested was not found
          </main>
        }
      />
      <Route
        path={BASE_PATH}
        element={<InternalWrapper children={<Outlet />} />}
      >
        <Route path={BASE_PATH} element={<RegistrationForInterest />} />
      </Route>
      <Route path={ADMIN_PATH} element={<ProtectedRoute session={session} />}>
        <Route
          index
          element={<Navigate to={ADMIN_REGISTRATION_LISTING_PATH} />}
        />
        <Route
          path={ADMIN_REGISTRATION_LISTING_PATH}
          element={<RegistrationListing />}
        />
      </Route>
      <Route path="*" element={<Navigate to={NOT_FOUND_PATH} />} />
    </Routes>
  );
};

export default Router;
