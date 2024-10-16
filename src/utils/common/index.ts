import { notification } from "antd";

export const showErrorToast: (config: {
  action: string;
  error: { message: string; [key: string]: any };
  placement?:
    | "topRight"
    | "top"
    | "topLeft"
    | "bottom"
    | "bottomLeft"
    | "bottomRight"
    | undefined;
}) => void = ({
  action = "",
  error = { message: "" },
  placement = "topRight",
}) => {
  notification.error({
    message: `Error occurred during ${action}`,
    description: error.message,
    placement: placement,
    duration: 3,
  });
};

export const showSuccessToast: (config: {
  message: string;
  placement?:
    | "topRight"
    | "top"
    | "topLeft"
    | "bottom"
    | "bottomLeft"
    | "bottomRight"
    | undefined;
}) => void = ({message = '', placement = 'topRight'}) => {
  notification.success({
    message: "Success",
    description: message,
    placement: placement,
    duration: 3,
  });
};
