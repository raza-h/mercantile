import { notification } from "antd";

function hasStringMessage(obj: unknown): obj is { message: string } {
  if (obj instanceof Error) return true;
  return (
    typeof obj === "object" &&
    obj !== null &&
    "message" in obj &&
    typeof obj.message! === "string"
  );
};

export const showErrorToast: (config: {
  action: string;
  error: unknown;
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
  error,
  placement = "topRight",
}) => {
  notification.error({
    message: `Error occurred during ${action}`,
    description: hasStringMessage(error) ? error.message : '',
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
