import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip as AntPopover } from "antd";
import { FC, ReactNode } from "react";

const Popover: FC<{
  title?: ReactNode | string;
}> = ({ title = "" }) => {
  return (
    <AntPopover color="#0046b5" title={title}>
      <InfoCircleOutlined />
    </AntPopover>
  );
};

export default Popover;
