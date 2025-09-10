import { Radio as AntRadio, RadioChangeEvent } from "antd";
import { formatOptions } from "../../pages/registration-for-interest/registration-form-constants";
import { FC } from "react";

const Radio: FC<{
  value: string | null;
  options: string[];
  onChange: (e: RadioChangeEvent) => void;
  className?: string;
}> = ({ value = null, options = [], onChange = () => {}, className = "" }) => {
  return (
    <AntRadio.Group
      options={formatOptions(options)}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default Radio;
