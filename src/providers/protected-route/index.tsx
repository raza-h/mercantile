import { Navigate, Outlet } from "react-router-dom";
import { ADMIN_LOGIN_PATH } from "../../constants/paths";
import { FC } from "react";
import InternalWrapper from "../internal-wrapper";

const ProtectedRoute: FC<{ session?: boolean }> = ({ session = true }) => {
  return session ? (
    <>
      <InternalWrapper>
        <Outlet />
      </InternalWrapper>
    </>
  ) : (
    <Navigate to={ADMIN_LOGIN_PATH} />
  );
};

export default ProtectedRoute;
