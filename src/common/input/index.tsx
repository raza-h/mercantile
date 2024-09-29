import { Input as AntdInput } from "antd";
import { ChangeEventHandler, FC } from "react";
import styles from "./index.module.scss";
import ErrorMessage from "../error-message";
import cx from "clsx";

const Input: FC<{
  label: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  type?: string;
  errorMsg?: string | null | false;
  [key: string]: any;
}> = ({
  label,
  value,
  onChange,
  name = label.toLowerCase(),
  type = "text",
  errorMsg = null,
  ...props
}) => {
  return (
    <article className={styles.inputBlock}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <AntdInput
        value={value}
        onChange={onChange}
        type={type}
        className={cx(styles.input, errorMsg ? styles.errorBorder : "")}
        {...props}
      />
      <ErrorMessage
        errorMsg={errorMsg ? errorMsg : ""}
        name={name}
        className={styles.errorMsg}
      />
    </article>
  );
};

export default Input;
