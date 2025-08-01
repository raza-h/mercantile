import { Navigate, Outlet } from "react-router-dom";
import { ADMIN_LOGIN_PATH } from "../../constants/paths";
import { Dispatch, FC, SetStateAction, useState } from "react";
import InternalWrapper from "../internal-wrapper";
import { Button, Flex } from "antd";
import { showErrorToast } from "../../utils/common";
import { logout } from "../../apis/auth";

const ProtectedRoute: FC<{ session?: boolean; setSession?: Dispatch<SetStateAction<boolean>> }> = ({
  session = true,
  setSession = () => {},
}) => {
  const [loading, setLoading] = useState(false);

  return session ? (
    <>
      <InternalWrapper>
        <Flex
          style={{ height: 0, position: "relative", padding: "0.25rem 2rem" }}
        >
          <Button
            danger
            style={{ marginLeft: "auto" }}
            onClick={async () => {
              try {
                setLoading(true);
                const success = await logout();
                setSession(!success);
              } catch (error: unknown) {
                showErrorToast({ action: "log out", error });
              } finally {
                setLoading(false);
              }
            }}
            loading={loading}
          >
            Log Out
          </Button>
        </Flex>
        <Outlet />
      </InternalWrapper>
    </>
  ) : (
    <Navigate to={ADMIN_LOGIN_PATH} />
  );
};

export default ProtectedRoute;
